import { GraphQLString } from "graphql"
import { resolve } from "path"

export const GRETTING = {
    type: GraphQLString,
    resolve: () => 'Hello, world'
}