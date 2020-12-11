import axios from 'axios'

export default function getData (page) {
  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const isArtistPage = this.dataName === 'artist'
  const artistUrl = `/lastfm/artists/${this.params().artistName}`
  const url = isArtistPage ? artistUrl : artistUrl + `/${this.dataName}`

  const limit = this.requestPageLimit
  const params = { ...{ limit, page } }
  const cancelToken = this.request.token
  const extra = { ...{ params, cancelToken } }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { artist } = resp.data

    const artistName = artist.name

    const data = isArtistPage ? {} : artist[this.dataName]
    const responseTotalPages = artist.total_pages
    const topTrackCountState = this.dataName === 'tracks' && {
      topTrackCount: topTrackCount(data)
    }

    const successState = {
      artistName,
      data,
      responseTotalPages,
      ...topTrackCountState,
      ...finishState
    }

    this.setState(successState)

    this.setNavSections(artistName)

    scrollToTop()
  }

  const topTrackCount = data => {
    const { topTrackCount } = this.state

    const pageTopTrackCount = page > 1 ? topTrackCount : data[0].listeners_count

    return data.length > 0 ? pageTopTrackCount : 0
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)

    scrollToTop()
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
