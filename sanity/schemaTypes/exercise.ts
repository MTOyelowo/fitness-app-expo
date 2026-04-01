import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  icon: () => '🏋️‍♂️',
  fields: [
    defineField({
      name: 'name',
      title: 'Exercise Name',
      description: 'The name of the exercise that will be displayed to users.',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'A brief description of the exercise, including how to perform it and which muscles it targets.',
      type: 'text',
      validation: (Rule) => Rule.max(500),
      rows: 4,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      description:
        'The difficulty level of the exercise to help users choose appropriate workouts.',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Exercise Image',
      description: 'An image showing the proper form of demonstration of the exercise.',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Description of the image for accessibility and SEO purposes.',
          validation: (Rule) => Rule.max(200),
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'A URL link to a video demonstrating the exercise.',
      type: 'url',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      description:
        'Indicates whether the exercise is currently active and should be shown to users.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'difficulty',
      media: 'image',
    },
  },
})
