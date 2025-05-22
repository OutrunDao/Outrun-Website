"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { CommunityLinks } from "@/components/community-links"
import dynamic from "next/dynamic"

// 动态导入组件，减少初始加载体积
const FormSection = dynamic(() => import("@/components/memeverse/create/form-section").then((mod) => mod.FormSection), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-purple-900/20 rounded-xl h-[400px]"></div>,
})

const MobileFormSection = dynamic(
  () => import("@/components/memeverse/create/mobile-form-section").then((mod) => mod.MobileFormSection),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-purple-900/20 rounded-xl h-[400px]"></div>,
  },
)

const ToggleSwitch = dynamic(
  () => import("@/components/memeverse/create/toggle-switch").then((mod) => mod.ToggleSwitch),
  {
    ssr: false,
  },
)

const GovernanceChainModal = dynamic(
  () => import("@/components/memeverse/create/governance-chain-modal").then((mod) => mod.NetworkModal),
  {
    ssr: false,
  },
)

const FundTypeModal = dynamic(
  () => import("@/components/memeverse/create/fund-type-modal").then((mod) => mod.FundTypeModal),
  {
    ssr: false,
  },
)

const OmniChainsModal = dynamic(
  () => import("@/components/memeverse/create/omni-chains-modal").then((mod) => mod.OmniChainsModal),
  {
    ssr: false,
  },
)

const SubmitButton = dynamic(
  () => import("@/components/memeverse/create/submit-button").then((mod) => mod.SubmitButton),
  {
    ssr: false,
  },
)

// Duration constraints
const minGenesisDuration = 1
const maxGenesisDuration = 3
const minLockupDays = 1
const maxLockupDays = 365

export default function CreateMemecoinPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // 检测是否为移动设备
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初始检查
    checkIfMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkIfMobile)

    // 清理监听器
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // 使用useReducer的思想合并相关状态
  const [formState, setFormState] = useState({
    isFlashGenesis: false,
    formData: {
      name: "",
      symbol: "",
      genesisDuration: "",
      liquidityLockDuration: "",
      genesieFundType: "UETH",
      governanceChain: "Binance Smart Chain",
      omniChains: [] as string[],
      description: "",
      website: "",
      x: "",
      discord: "",
      telegram: "",
    },
    validation: {
      isGenesisDurationValid: true,
      isLiquidityLockDurationValid: true,
    },
    ui: {
      logoFile: null as File | null,
      logoPreview: null as string | null,
      isSubmitting: false,
      currentModal: null as "network" | "omniChains" | "fundType" | null,
    },
  })

  // 使用解构简化访问
  const { formData, validation, ui } = formState
  const { isFlashGenesis } = formState
  const { isGenesisDurationValid, isLiquidityLockDurationValid } = validation
  const { logoPreview, isSubmitting, currentModal } = ui

  // 可用的链和资金类型
  const availableChains = useMemo(
    () => ["Ethereum", "Binance Smart Chain", "Polygon", "Arbitrum", "Optimism", "Avalanche", "Base"],
    [],
  )

  const fundTypes = useMemo(() => ["UUSD", "UETH", "UBNB", "UAVAE", "UPOL", "US"], [])

  // 使用useCallback优化事件处理函数
  const toggleFlashGenesis = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      isFlashGenesis: !prev.isFlashGenesis,
    }))
  }, [])

  // 验证表单字段
  useEffect(() => {
    if (formData.genesisDuration === "") {
      setFormState((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          isGenesisDurationValid: true,
        },
      }))
    } else {
      const value = Number(formData.genesisDuration)
      setFormState((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          isGenesisDurationValid: value >= minGenesisDuration && value <= maxGenesisDuration,
        },
      }))
    }
  }, [formData.genesisDuration])

  useEffect(() => {
    if (formData.liquidityLockDuration === "") {
      setFormState((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          isLiquidityLockDurationValid: true,
        },
      }))
    } else {
      const value = Number(formData.liquidityLockDuration)
      setFormState((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          isLiquidityLockDurationValid: value >= minLockupDays && value <= maxLockupDays,
        },
      }))
    }
  }, [formData.liquidityLockDuration])

  // 处理输入变化
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // 对于数字输入进行特殊处理
    if (name === "genesisDuration" || name === "liquidityLockDuration") {
      // 只允许数字输入
      if (value === "" || /^\d+$/.test(value)) {
        setFormState((prev) => ({
          ...prev,
          formData: {
            ...prev.formData,
            [name]: value,
          },
        }))
      }
      return
    }

    // 对于其他输入
    setFormState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }))
  }, [])

  // 处理社区链接变化
  const handleCommunityLinkChange = useCallback((name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }))
  }, [])

  // 处理Logo上传
  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // 创建预览
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormState((prev) => ({
            ...prev,
            ui: {
              ...prev.ui,
              logoFile: file,
              logoPreview: event.target.result as string,
            },
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // 打开模态框
  const openModal = useCallback((modalType: "network" | "omniChains" | "fundType") => {
    setFormState((prev) => ({
      ...prev,
      ui: {
        ...prev.ui,
        currentModal: modalType,
      },
    }))
  }, [])

  // 关闭模态框
  const closeModal = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      ui: {
        ...prev.ui,
        currentModal: null,
      },
    }))
  }, [])

  // 处理网络选择
  const handleNetworkSelect = useCallback((network: string) => {
    setFormState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        governanceChain: network,
      },
      ui: {
        ...prev.ui,
        currentModal: null,
      },
    }))
  }, [])

  // 处理资金类型选择
  const handleFundTypeSelect = useCallback((type: string) => {
    setFormState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        genesieFundType: type,
      },
      ui: {
        ...prev.ui,
        currentModal: null,
      },
    }))
  }, [])

  // 处理Omni链选择
  const handleOmniChainToggle = useCallback((chain: string) => {
    setFormState((prev) => {
      const currentChains = [...prev.formData.omniChains]
      const newChains = currentChains.includes(chain)
        ? currentChains.filter((c) => c !== chain)
        : [...currentChains, chain]

      return {
        ...prev,
        formData: {
          ...prev.formData,
          omniChains: newChains,
        },
      }
    })
  }, [])

  // 处理返回按钮点击
  const handleBackClick = useCallback(() => {
    router.push("/memeverse/board")
  }, [router])

  // 处理表单提交
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // 检查Logo是否上传
      if (!ui.logoFile) {
        // 根据设备类型选择正确的Logo上传元素ID
        const logoUploadId = isMobile ? "logo-upload-mobile" : "logo-upload"
        const logoUploadElement = document.getElementById(logoUploadId)

        if (logoUploadElement) {
          // 获取父元素（上传框容器）
          const logoContainer = logoUploadElement.closest("div.rounded-lg")
          if (logoContainer) {
            // 滚动到Logo上传框
            logoContainer.scrollIntoView({ behavior: "smooth", block: "center" })
            // 闪烁提示用户上传Logo
            logoContainer.classList.add("ring-2", "ring-red-500", "ring-opacity-70")
            setTimeout(() => {
              logoContainer.classList.remove("ring-2", "ring-red-500", "ring-opacity-70")
            }, 2000)
            return // 停止提交
          }
        }
      }

      // 检查必填字段
      const requiredFields = [
        { id: "name", label: "Name" },
        { id: "symbol", label: "Symbol" },
        { id: "genesisDuration", label: "Genesis Duration" },
        { id: "liquidityLockDuration", label: "Liquidity Lock Duration" },
        { id: "description", label: "Description" },
      ]

      // 检查第一个空字段
      for (const field of requiredFields) {
        const value = formData[field.id as keyof typeof formData]
        if (!value) {
          // 找到空字段，聚焦并滚动到该元素
          const element = document.getElementById(isMobile ? `${field.id}-mobile` : field.id)
          if (element) {
            element.focus()
            // 使用scrollIntoView确保元素完全可见
            element.scrollIntoView({ behavior: "smooth", block: "center" })
            return // 停止提交
          }
        }
      }

      // 验证duration字段
      const genesisDuration = Number(formData.genesisDuration)
      const liquidityLockDuration = Number(formData.liquidityLockDuration)

      if (genesisDuration < minGenesisDuration || genesisDuration > maxGenesisDuration) {
        setFormState((prev) => ({
          ...prev,
          validation: {
            ...prev.validation,
            isGenesisDurationValid: false,
          },
        }))
        const element = document.getElementById(isMobile ? "genesisDuration-mobile" : "genesisDuration")
        if (element) {
          element.focus()
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        return
      }

      if (liquidityLockDuration < minLockupDays || liquidityLockDuration > maxLockupDays) {
        setFormState((prev) => ({
          ...prev,
          validation: {
            ...prev.validation,
            isLiquidityLockDurationValid: false,
          },
        }))
        const element = document.getElementById(isMobile ? "liquidityLockDuration-mobile" : "liquidityLockDuration")
        if (element) {
          element.focus()
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        return
      }

      setFormState((prev) => ({
        ...prev,
        ui: {
          ...prev.ui,
          isSubmitting: true,
        },
      }))

      // 模拟API调用
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          ui: {
            ...prev.ui,
            isSubmitting: false,
          },
        }))
        // 导航到成功页面或board
        router.push("/memeverse/board")
        // 在实际实现中，你会将表单数据提交到API
      }, 2000)
    },
    [formData, router, isMobile, ui.logoFile],
  )

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Page content */}
      <div className="container px-4 md:px-6 mx-auto pt-24 md:pt-24 pb-8 md:pb-16">
        <div className="max-w-3xl mx-auto mb-6 md:mb-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Back button - 使用条件渲染为PC和移动端提供不同的按钮 */}
          {/* PC端按钮 - 只在md及以上屏幕显示 */}
          <Button
            onClick={handleBackClick}
            variant="outline"
            className="hidden md:flex relative overflow-hidden group w-auto mr-auto md:mr-0 md:absolute md:left-0 md:w-auto md:relative md:overflow-hidden desktop-back-button"
          >
            {/* 背景渐变效果 */}
            <span className="absolute inset-0 block opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>

            {/* 发光边框效果 */}
            <span
              className="absolute inset-0 block rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out"
              style={{
                boxShadow:
                  "0 0 5px rgba(236, 72, 153, 0.6), 0 0 15px rgba(236, 72, 153, 0.4), 0 0 25px rgba(168, 85, 247, 0.2)",
                border: "1px solid rgba(236, 72, 153, 0.7)",
              }}
            ></span>

            {/* 按钮内容 */}
            <div className="flex items-center relative z-10">
              <ChevronLeft className="mr-1 h-4 w-4 text-pink-300 group-hover:text-pink-200 transition-colors duration-500" />
              <span className="text-pink-300 group-hover:text-pink-200 transition-colors duration-500 font-medium">
                Back to Board
              </span>
            </div>
          </Button>

          {/* 移动端按钮 - 只在小于md的屏幕显示 */}
          <button
            onClick={handleBackClick}
            type="button"
            className="md:hidden flex items-center text-pink-300 mr-auto bg-transparent border-0 p-0 shadow-none outline-none"
          >
            <ChevronLeft className="mr-1 h-4 w-4 text-pink-300" />
            <span className="font-medium">Back</span>
          </button>

          {/* Page title */}
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent text-center">
            Consensus Launch
          </h1>

          {/* 添加一个空的div来平衡布局 */}
          <div className="hidden md:block md:invisible w-[120px]"></div>
        </div>

        {/* Form container */}
        <div className="max-w-3xl mx-auto px-2 md:px-0">
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              boxShadow: "0 0 2px #ec4899, 0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
              border: "1px solid rgba(236,72,153,0.3)",
            }}
          >
            {/* 背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326] via-[#1a0445] to-[#0f0326] backdrop-blur-xl"></div>

            {/* 网格背景 */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                backgroundPosition: "center center",
              }}
            ></div>

            {/* 底部发光效果 */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-600/5 to-transparent"></div>

            {/* Card content */}
            <div className="relative z-10">
              <div className="p-4 md:p-8 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Flash Genesis Toggle */}
                  <ToggleSwitch
                    isEnabled={isFlashGenesis}
                    onChange={toggleFlashGenesis}
                    label="Flash Genesis"
                    tooltipContent="Enable Flash Genesis for accelerated token launch"
                  />

                  {/* 根据屏幕尺寸条件渲染不同的表单组件 */}
                  {isMobile ? (
                    <MobileFormSection
                      formData={formData}
                      logoPreview={logoPreview}
                      isGenesisDurationValid={isGenesisDurationValid}
                      isLiquidityLockDurationValid={isLiquidityLockDurationValid}
                      minGenesisDuration={minGenesisDuration}
                      maxGenesisDuration={maxGenesisDuration}
                      minLockupDays={minLockupDays}
                      maxLockupDays={maxLockupDays}
                      handleChange={handleChange}
                      handleLogoUpload={handleLogoUpload}
                      openModal={openModal}
                    />
                  ) : (
                    <FormSection
                      formData={formData}
                      logoPreview={logoPreview}
                      isGenesisDurationValid={isGenesisDurationValid}
                      isLiquidityLockDurationValid={isLiquidityLockDurationValid}
                      minGenesisDuration={minGenesisDuration}
                      maxGenesisDuration={maxGenesisDuration}
                      minLockupDays={minLockupDays}
                      maxLockupDays={maxLockupDays}
                      handleChange={handleChange}
                      handleLogoUpload={handleLogoUpload}
                      openModal={openModal}
                    />
                  )}

                  {/* Community Links Component */}
                  <CommunityLinks
                    website={formData.website}
                    x={formData.x}
                    discord={formData.discord}
                    telegram={formData.telegram}
                    onChange={handleCommunityLinkChange}
                  />

                  {/* Submit button */}
                  <SubmitButton isSubmitting={isSubmitting} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GovernanceChainModal
        isOpen={currentModal === "network"}
        onClose={closeModal}
        title="Governance Chain"
        networks={availableChains}
        selectedNetwork={formData.governanceChain}
        onSelect={handleNetworkSelect}
      />

      <FundTypeModal
        isOpen={currentModal === "fundType"}
        onClose={closeModal}
        title="Fund Type"
        fundTypes={fundTypes}
        selectedType={formData.genesieFundType}
        onSelect={handleFundTypeSelect}
      />

      <OmniChainsModal
        isOpen={currentModal === "omniChains"}
        onClose={closeModal}
        title="OmniChains"
        chains={availableChains}
        selectedChains={formData.omniChains}
        onToggle={handleOmniChainToggle}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 72, 153, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.7);
        }
        
        @keyframes flash {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }
        
        .animate-flash {
          animation: flash 0.5s ease-in-out 1;
        }

        input:focus,
        textarea:focus {
          outline: none;
        }

        .desktop-back-button {
          background: rgba(15, 3, 38, 0.8);
          border: 1px solid rgba(236, 72, 153, 0.4);
          border-radius: 9999px;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.3), 0 0 20px rgba(168, 85, 247, 0.2);
          padding: 8px 16px;
          transition: all 0.5s ease-in-out;
        }

        .desktop-back-button:hover {
          background: rgba(25, 10, 45, 0.9);
          color: #f9a8d4; /* 粉色 */
          text-shadow: 0 0 5px rgba(249, 168, 212, 0.4);
        }

        /* 移除所有mobile-back-button相关样式 */
      `}</style>
    </div>
  )
}
