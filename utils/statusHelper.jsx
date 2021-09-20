import TheBadge from '../components/TheBadge/TheBadge'

export const statusEnum = {
  TODO: 'todo',
  WAITING_ANSWER: 'waiting_answer',
  INTERVIEW: 'interview',
  REJECTION: 'rejection',
  NO_ANSWER: 'no_answer',
}

export function getStatusBadgeFromStatus(status) {
  switch (status) {
    case statusEnum.TODO:
      return (
        <TheBadge variant="filled" color="blue">
          ToDo
        </TheBadge>
      )
    case statusEnum.WAITING_ANSWER:
      return (
        <TheBadge variant="filled" color="yellow">
          Waiting for answer
        </TheBadge>
      )
    case statusEnum.INTERVIEW:
      return (
        <TheBadge variant="filled" color="green">
          Job interview
        </TheBadge>
      )
    case statusEnum.REJECTION:
      return (
        <TheBadge variant="filled" color="dark">
          Rejected
        </TheBadge>
      )
    case statusEnum.NO_ANSWER:
      return (
        <TheBadge variant="filled" color="orange">
          No answer
        </TheBadge>
      )

    default:
      return 'default...'
  }
}
