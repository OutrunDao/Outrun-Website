"use client"

import type React from "react"

import { useEffect, useRef } from "react"

/**
 * Hook for using event listeners
 * @param eventName Event name
 * @param handler Event handler function
 * @param element Element to listen on, defaults to window
 * @param options Event listener options
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: React.RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KD extends keyof DocumentEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: KW | KH | KD,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | DocumentEventMap[KD] | Event) => void,
  element?: React.RefObject<T> | undefined,
  options?: boolean | AddEventListenerOptions,
) {
  // Create a ref to store the handler function
  const savedHandler = useRef(handler)

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // 捕获当前的targetElement
    const targetElement: T | Window = element?.current || window

    if (!(targetElement && targetElement.addEventListener)) return

    // 创建事件监听器
    const eventListener: typeof handler = (event) => savedHandler.current(event)

    // 添加事件监听器
    targetElement.addEventListener(eventName, eventListener, options)

    // 清理函数 - 使用闭包捕获当前的targetElement
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
}
