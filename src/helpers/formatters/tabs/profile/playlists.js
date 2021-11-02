import i18n from '*/i18n'
import {
  playlists as formatProfilePlaylistsLink
} from '#/formatters/links/profile'

export default function ({ profileId, profileNickname }) {
  const formatTitle = () => {
    return i18n.global.t(
      'layout.navigation.profile.playlists',
      { nickname: profileNickname }
    )
  }

  const formatPath = () => {
    return formatProfilePlaylistsLink({
      profileId
    }).path
  }

  return {
    icon: 'file audio',
    title: formatTitle(),
    path: formatPath()
  }
}