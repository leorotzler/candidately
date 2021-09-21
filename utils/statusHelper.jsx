import TheBadge from '../components/TheBadge/TheBadge'

export const statusEnum = {
  TODO: 'todo',
  WAITING_ANSWER: 'waiting_answer',
  INTERVIEW: 'interview',
  REJECTION: 'rejection',
  NO_ANSWER: 'no_answer',
}

export function getStatusLabelsFromStatus(status) {
  switch (status) {
    case statusEnum.TODO:
      return 'ToDo'
    case statusEnum.WAITING_ANSWER:
      return 'Waiting for answer'
    case statusEnum.INTERVIEW:
      return 'Job interview'
    case statusEnum.REJECTION:
      return 'Rejected'
    case statusEnum.NO_ANSWER:
      return 'No answer'

    default:
      return 'error'
  }
}

function getBadge(status, color) {
  return (
    <TheBadge backgroundColor={color}>
      {getStatusLabelsFromStatus(status)}
    </TheBadge>
  )
}

export function getStatusBadgeFromStatus(status) {
  switch (status) {
    case statusEnum.TODO:
      return getBadge(status, '#4DABF7')
    case statusEnum.WAITING_ANSWER:
      return getBadge(status, '#FFD43B')
    case statusEnum.INTERVIEW:
      return getBadge(status, '#A9E34B')
    case statusEnum.REJECTION:
      return getBadge(status, '#5C5F66')
    case statusEnum.NO_ANSWER:
      return getBadge(status, '#FFA94D')

    default:
      return 'default...'
  }
}
