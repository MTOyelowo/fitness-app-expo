import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: () => '💪',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      description: 'The Clerk user ID of the user who performed this workout.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'The date when the workout was performed.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      description: 'The total duration of the workout in seconds.',
      type: 'number',
      validation: (Rule) => Rule.required().positive().min(0),
    }),
    defineField({
      name: 'exercises',
      title: 'Workout Exercises',
      description: 'The exercises performed in this workout with sets, reps, and weights.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workoutExercise',
          title: 'Workout Exercise',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              description: 'The exercise that was performed.',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              description:
                'The number of sets performed for this exercise with reps and weight details',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'exerciseSet',
                  title: 'Exercise Set',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Repetitions',
                      description: 'The number of repetitions performed for this exercise.',
                      type: 'number',
                      validation: (Rule) => Rule.required().positive().integer().min(0),
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      description: 'The weight used for this exercise.',
                      type: 'number',
                      validation: (Rule) => Rule.required().positive().min(0),
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      description: 'The unit of measurement for the weight used in this exercise.',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Kilograms', value: 'kg'},
                          {title: 'Pounds', value: 'lb'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'lb',
                    }),
                  ],
                  preview: {
                    select: {
                      reps: 'reps',
                      weight: 'weight',
                      weightUnit: 'weightUnit',
                    },
                    prepare({reps, weight, weightUnit}) {
                      return {
                        title: reps != null ? `${reps} reps` : 'Set',
                        subtitle: weight != null ? `${weight} ${weightUnit ?? 'lb'}` : undefined,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'exercise.name',
              sets: 'sets',
            },
            prepare({title, sets}) {
              const setCount = sets ? sets.length : 0
              return {
                title: title || 'Exercise',
                subtitle: `${setCount} set${setCount !== 1 ? 's' : ''}`,
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exercises: 'exercises',
    },
    prepare({date, duration, exercises}) {
      const workoutDate = date ? new Date(date).toLocaleDateString() : 'No date'
      const durationMinutes = duration ? Math.round(duration / 60) : 0
      const exerciseCount = exercises ? exercises.length : 0
      return {
        title: `Workout on ${workoutDate}`,
        subtitle: `${durationMinutes} min • ${exerciseCount} exercise${exerciseCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
