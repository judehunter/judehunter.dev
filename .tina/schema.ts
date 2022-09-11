
import { defineSchema, defineConfig } from 'tinacms'
import { client } from './__generated__/client'


const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'
const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token: '<Your Read Only Token>', // generated on app.tina.io,
    clientId: '<Your Client ID>', // generated on app.tina.io
    branch,
    media: {
      tina: {
        mediaRoot: "media",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Create Date',
          name: 'createDate',
        },
        {
          type: 'image',
          label: 'Thumbnail',
          name: 'thumbnail',
        },
        {
          label: 'Tags',
          name: 'tags',
          type: 'string',
          list: true,
        },
        {
          type: 'rich-text',
          label: 'Blog Post Body',
          name: 'body',
          isBody: true,
          templates: [
            {
              name: "CodeBlock",
              label: "Code Block",
              fields:[
                {
                  name: "lang",
                  label: "Language",
                  type: "string",
                },
                {
                  name: "code",
                  label: "Code",
                  type: "string",
                },
              ]
            },
          ],
        },
      ],
    },
  ],
})

export default schema

// Your tina config

export const tinaConfig = defineConfig({
  client,
  schema,
  cmsCallback: (cms) => {
    //  add your CMS callback code here (if you want)

    // The Route Mapper
    /**
     * 1. Import `tinacms` and `RouteMappingPlugin`
     **/
    import('tinacms').then(({ RouteMappingPlugin }) => {
      /**
       * 2. Define the `RouteMappingPlugin` see https://tina.io/docs/tinacms-context/#the-routemappingplugin for more details
       **/
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        return undefined
      })
      /**
       * 3. Add the `RouteMappingPlugin` to the `cms`.
       **/
      cms.plugins.add(RouteMapping)
    })

    return cms
  },
})

