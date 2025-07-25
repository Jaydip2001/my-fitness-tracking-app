import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  icon: () => '💪',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      description: "The user's Clerk ID",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'Workout duration in seconds',
      type: 'number',
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      of: [
        {
          name: 'workoutExercise',
          title: 'Workout Exercise',
          type: 'object',
          fields: [
            {
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sets',
              title: 'Sets',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'set',
                  title: 'Set',
                  fields: [
                    {
                      name: 'reps',
                      title: 'Reps',
                      type: 'number',
                      validation: (Rule) => Rule.required().integer().min(1),
                    },
                    {
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                    },
                    {
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'kg', value: 'kg'},
                          {title: 'lbs', value: 'lbs'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'kg',
                    },
                  ],
                  preview: {
                    select: {
                      reps: 'reps',
                      weight: 'weight',
                      unit: 'weightUnit',
                    },
                    prepare({reps, weight, unit}) {
                      return {
                        title:
                          `${reps} reps` +
                          (weight ? ` at ${weight}${unit || ''}` : ''),
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'exercise.name',
              sets: 'sets',
              media: 'exercise.image',
            },
            prepare({title, media, sets}) {
              const setCount = sets ? sets.length : 0
              return {
                title: title,
                subtitle: `${setCount} set${setCount !== 1 ? 's' : ''}`,
                media: media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      userId: 'userId',
      date: 'date',
      exercises: 'exercises',
    },
    prepare({userId, date, exercises}) {
      const exerciseCount = exercises ? exercises.length : 0
      const dateString = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: `Workout on ${dateString}`,
        subtitle: `by ${userId || 'Unknown user'} - ${exerciseCount} exercise${
          exerciseCount !== 1 ? 's' : ''
        }`,
      }
    },
  },
})
