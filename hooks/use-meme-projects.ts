import useSWR from "swr"
import { MOCK_PROJECTS } from "@/data/memeverse-projects"
import type { MemeProject } from "@/types/memeverse"

// 模拟API获取函数
const fetchProjects = async (): Promise<MemeProject[]> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_PROJECTS
}

export function useMemeProjects() {
  const { data, error, isLoading, mutate } = useSWR("memeverse/projects", fetchProjects, {
    // 保留之前的数据直到新数据加载完成
    keepPreviousData: true,
    // 重新验证间隔（30秒）
    refreshInterval: 30000,
    // 页面重新获得焦点时重新验证
    revalidateOnFocus: true,
    // 网络恢复时重新验证
    revalidateOnReconnect: true,
    // 错误重试
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // 最多重试3次
      if (retryCount >= 3) return
      // 5秒后重试
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
  })

  return {
    projects: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}
