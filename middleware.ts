import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 检查请求路径是否是Service Worker相关
  const url = request.nextUrl.pathname
  if (url.includes("__v0_sw.js") || url.includes("sw.js") || url.includes("service-worker")) {
    // 对Service Worker请求不做任何处理，直接返回
    return NextResponse.next()
  }

  // 克隆请求头
  const requestHeaders = new Headers(request.headers)

  // 创建响应
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // 添加 CSP 头到响应，确保不会干扰 Service Worker
  response.headers.set(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*; font-src 'self' data:; connect-src 'self' blob: data: https://*; frame-src 'self';",
  )

  return response
}

// 更精确地排除Service Worker相关路径
export const config = {
  matcher: [
    // 排除API路由、静态������件、图像优化、favicon和所有JavaScript文件
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.js$).*)",
    // 排除所有可能的Service Worker路径
    "/((?!__v0_sw.js|sw.js|service-worker.js|workbox-*.js).*)",
  ],
}
