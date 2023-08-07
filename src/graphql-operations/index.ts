import { gql } from "graphql-tag"

export const INSERT_USER = gql`
mutation insert_user($color: String = "", $unique_id: bigint = "", $username: String = "") {
  insert_chatting_users(objects: {color: $color, username: $username, unique_id: $unique_id}) {
    returning {
      username
    }
  }
}
`

export const INSERT_MESSAGE = gql`
mutation insert_message($message: String = "", $username: String = "", $color: String = "", $room_id: bigint = "", $user_id: bigint = "") {
  insert_chatting_messages(objects: {color: $color, message: $message, username: $username, room_id: $room_id, user_id: $user_id}) {
    returning {
      message
    }
  }
}
`