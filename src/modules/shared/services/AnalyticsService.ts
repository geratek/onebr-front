import axios from '@/main/axios'

abstract class AnalyticsService {
  static totalViews(path: string) {
    return axios.get('analytics/usersTotalCount', { params: { path } })
  }
}

export default AnalyticsService
