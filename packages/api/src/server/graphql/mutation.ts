import {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInputObjectType} from 'graphql'

import GraphQLArticle from './article'
import Context from '../context'

import {ArticleCreateArguments} from '../adapter'
import {generateID} from '../utility'

export const GraphQLArticleInput = new GraphQLInputObjectType({
  name: 'ArticleInput',
  fields: {
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    lead: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
})

export const GraphQLMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createArticle: {
      type: GraphQLArticle,
      args: {
        article: {
          type: GraphQLNonNull(GraphQLArticleInput),
          description: 'Article to create.'
        }
      },
      resolve(_root, args, context: Context) {
        return context.adapter.createArticle(generateID(), args as ArticleCreateArguments)
      }
    }
  }
})

export default GraphQLMutation