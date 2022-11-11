import axios from 'axios'

const useHttp = () => {
  const request = async (httpSetup) => {
    const res = await axios({
      method: httpSetup.method,
      data: httpSetup.data,
      url: httpSetup.url,
      headers: httpSetup.headers,
    })
    return res
  }

  return {
    request
  }

}

export default useHttp