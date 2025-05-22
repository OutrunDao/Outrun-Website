"use client"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { TokenIcon } from "@/components/ui/token-icon"
import { useNetwork } from "@/contexts/network-context"
import { GradientBackgroundCard } from "@/components/ui/gradient-background-card"

interface ReferralHistoryProps {
  view: "history" | "friends"
}

// Update transaction record data structure, add network field and txHash field
interface TradeRecord {
  id: number
  path: {
    tokens: string[] // 代币数组，可以是2个或3个
  }
  commission: {
    amounts: string[]
    tokens: string[]
  }
  network: string // 添加网络字段
  referredAddress: string
  timestamp: string
  txHash?: string // 交易哈希，用于链接到区块浏览器
}

// Referred friend data structure
interface ReferredFriend {
  id: number
  joinDate: string
  address: string
  volume: string
  earned: string
}

// Simple network icon component - remove background
function SimpleNetworkIcon({ networkId }: { networkId: string }) {
  const { networks } = useNetwork()
  const network = networks.find((n) => n.id === networkId)

  if (!network) {
    return (
      <div className="w-5 h-5 flex items-center justify-center text-xs text-zinc-400">
        {networkId.slice(0, 1).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={network.icon || `/networks/${networkId}.svg`}
      alt={network.name}
      className="w-5 h-5"
      onError={(e) => {
        // 如果图片加载失败，显示首字母
        e.currentTarget.style.display = "none"
        e.currentTarget.parentElement!.innerHTML = network.name.slice(0, 1).toUpperCase()
      }}
    />
  )
}

// Modify ReferralHistory component style to keep consistent with LiquidityPoolsTable component
export function ReferralHistory({ view = "history" }: ReferralHistoryProps) {
  const isMobile = useMobile()

  return (
    <GradientBackgroundCard
      shadow
      border
      borderColor="rgba(236,72,153,0.3)"
      shadowColor="rgba(236,72,153,0.4)"
      contentClassName="relative overflow-x-auto"
    >
      {view === "history" ? <HistoryTable /> : <FriendsTable />}
    </GradientBackgroundCard>
  )
}

function HistoryTable() {
  const isMobile = useMobile()

  // 处理点击交易记录的事件 - 未来会跳转到区块浏览器
  const handleViewTransaction = (record: TradeRecord) => {
    console.log(`View transaction in block explorer: ${record.id}`)
    // 未来实现: 根据network和txHash构建URL并跳转
    // 例如: window.open(`https://${getExplorerUrl(record.network)}/tx/${record.txHash}`, '_blank')
  }

  // 更新模拟交易记录数据，添加网络信息
  const tradeRecords: TradeRecord[] = [
    {
      id: 1,
      path: { tokens: ["ETH", "USDC"] },
      commission: {
        amounts: ["0.005"],
        tokens: ["ETH"],
      },
      network: "ethereum",
      referredAddress: "0x1a2b...3c4d",
      timestamp: "5 min ago",
      txHash: "0xabcd1234...",
    },
    {
      id: 2,
      path: { tokens: ["USDC", "WBTC", "ETH"] },
      commission: {
        amounts: ["1.45", "0.0001"],
        tokens: ["USDC", "WBTC"],
      },
      network: "arbitrum",
      referredAddress: "0x5e6f...7g8h",
      timestamp: "15 min ago",
      txHash: "0xefgh5678...",
    },
    {
      id: 3,
      path: { tokens: ["ETH", "DAI"] },
      commission: {
        amounts: ["0.003"],
        tokens: ["ETH"],
      },
      network: "base",
      referredAddress: "0x9i0j...1k2l",
      timestamp: "1 hour ago",
      txHash: "0xijkl9012...",
    },
    {
      id: 4,
      path: { tokens: ["WBTC", "USDT", "DAI"] },
      commission: {
        amounts: ["0.0002", "1.75"],
        tokens: ["WBTC", "USDT"],
      },
      network: "polygon",
      referredAddress: "0x3m4n...5o6p",
      timestamp: "3 hours ago",
      txHash: "0xmnop3456...",
    },
    {
      id: 5,
      path: { tokens: ["USDT", "DAI"] },
      commission: {
        amounts: ["2.10"],
        tokens: ["USDT"],
      },
      network: "ethereum",
      referredAddress: "0x7q8r...9s0t",
      timestamp: "5 hours ago",
      txHash: "0xqrst7890...",
    },
    {
      id: 6,
      path: { tokens: ["DAI", "ETH", "USDC"] },
      commission: {
        amounts: ["3.25", "0.002"],
        tokens: ["DAI", "ETH"],
      },
      network: "arbitrum",
      referredAddress: "0x1u2v...3w4x",
      timestamp: "8 hours ago",
      txHash: "0xuvwx1234...",
    },
    {
      id: 7,
      path: { tokens: ["ETH", "WBTC"] },
      commission: {
        amounts: ["0.008"],
        tokens: ["ETH"],
      },
      network: "base",
      referredAddress: "0x5y6z...7a8b",
      timestamp: "12 hours ago",
      txHash: "0xyzab5678...",
    },
    {
      id: 8,
      path: { tokens: ["USDC", "ETH", "DAI"] },
      commission: {
        amounts: ["2.75", "0.001"],
        tokens: ["USDC", "ETH"],
      },
      network: "bnb",
      referredAddress: "0x9c0d...1e2f",
      timestamp: "1 day ago",
      txHash: "0xcdef9012...",
    },
    {
      id: 9,
      path: { tokens: ["WBTC", "USDT"] },
      commission: {
        amounts: ["0.0003"],
        tokens: ["WBTC"],
      },
      network: "ethereum",
      referredAddress: "0x3g4h...5i6j",
      timestamp: "1 day ago",
      txHash: "0xghij3456...",
    },
    {
      id: 10,
      path: { tokens: ["USDT", "USDC", "ETH"] },
      commission: {
        amounts: ["4.50", "3.25"],
        tokens: ["USDT", "USDC"],
      },
      network: "polygon",
      referredAddress: "0x7k8l...9m0n",
      timestamp: "2 days ago",
      txHash: "0xklmn7890...",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  }

  // 渲染交易路径
  const renderPath = (tokens: string[]) => (
    <div className="flex items-center flex-wrap">
      {tokens.map((token, index) => (
        <div key={index} className="flex items-center">
          <TokenIcon symbol={token} size={24} />
          {index < tokens.length - 1 && (
            <div className="w-5 flex items-center">
              <div className="w-full border-t-2 border-dashed border-purple-400/60"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  // 渲染佣金
  const renderCommission = (amounts: string[], tokens: string[]) => (
    <div className="flex items-center flex-wrap gap-3">
      {amounts.map((amount, index) => (
        <div key={index} className="flex items-center">
          <span className="mr-1 text-sm">{amount}</span>
          <TokenIcon symbol={tokens[index]} size={16} />
        </div>
      ))}
    </div>
  )

  // 渲染网络
  const renderNetwork = (networkId: string) => (
    <div className="flex items-center justify-center">
      <SimpleNetworkIcon networkId={networkId} />
    </div>
  )

  if (isMobile) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white">Recent Referral Transactions</h3>
        </div>
        <div className="space-y-4">
          {tradeRecords.map((record) => (
            <div
              key={record.id}
              className="bg-black/40 p-3 rounded-lg border border-white/5 cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => handleViewTransaction(record)}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex-1 overflow-x-auto pb-1">{renderPath(record.path.tokens)}</div>
                <span className="text-xs text-zinc-400 ml-2 whitespace-nowrap">{record.timestamp}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Commission</span>
                <div className="flex flex-wrap justify-end">
                  {renderCommission(record.commission.amounts, record.commission.tokens)}
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Network</span>
                <div>{renderNetwork(record.network)}</div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Referred</span>
                <span className="text-sm">{record.referredAddress}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  // 使用grid布局来确保列之间的间距均匀
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white">Recent Referral Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col width="25%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Transaction</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Commission</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-zinc-400">Network</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Referred Address</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-zinc-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {tradeRecords.map((record) => (
              <tr
                key={record.id}
                className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-200"
                onClick={() => handleViewTransaction(record)}
              >
                <td className="py-3 px-4 overflow-hidden">{renderPath(record.path.tokens)}</td>
                <td className="py-3 px-4 overflow-hidden">
                  {renderCommission(record.commission.amounts, record.commission.tokens)}
                </td>
                <td className="py-3 px-4 text-center">{renderNetwork(record.network)}</td>
                <td className="py-3 px-4 text-sm overflow-hidden">{record.referredAddress}</td>
                <td className="py-3 px-4 text-sm text-right text-zinc-400">{record.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function FriendsTable() {
  const isMobile = useMobile()

  // 处理点击好友记录的事件
  const handleViewFriend = (friend: ReferredFriend) => {
    console.log(`View friend details: ${friend.id}`)
    // 未来实现: 显示好友详情或跳转到相关页面
  }

  // 模拟被推荐人据
  const friendsData: ReferredFriend[] = [
    { id: 1, joinDate: "2023-04-15", address: "0x1a2b...3c4d", volume: "$1,245.00", earned: "$12.45" },
    { id: 2, joinDate: "2023-04-20", address: "0x5e6f...7g8h", volume: "$832.00", earned: "$8.32" },
    { id: 3, joinDate: "2023-04-25", address: "0x9i0j...1k2l", volume: "$1,578.00", earned: "$15.78" },
    { id: 4, joinDate: "2023-05-01", address: "0x3m4n...5o6p", volume: "$521.00", earned: "$5.21" },
  ]

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  }

  if (isMobile) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white">Referred Friends</h3>
        </div>
        <div className="space-y-4">
          {friendsData.map((friend) => (
            <div
              key={friend.id}
              className="bg-black/40 p-3 rounded-lg border border-white/5 cursor-pointer hover:bg-white/10 transition-colors duration-200"
              onClick={() => handleViewFriend(friend)}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm text-zinc-400">Joined</span>
                <span className="text-sm">{friend.joinDate}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-zinc-400">Address</span>
                <span className="text-sm">{friend.address}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-zinc-400">Volume</span>
                <span className="text-sm">{friend.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">You Earned</span>
                <span className="text-sm font-medium text-green-400">{friend.earned}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  // 修改表格布局，减少右侧空白
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white">Referred Friends</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="25%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Join Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Address</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Trading Volume</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-zinc-400">You Earned</th>
            </tr>
          </thead>
          <tbody>
            {friendsData.map((friend) => (
              <tr
                key={friend.id}
                className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-200"
                onClick={() => handleViewFriend(friend)}
              >
                <td className="py-3 px-4 text-sm">{friend.joinDate}</td>
                <td className="py-3 px-4 text-sm">{friend.address}</td>
                <td className="py-3 px-4 text-sm">{friend.volume}</td>
                <td className="py-3 px-4 text-sm font-medium text-right text-green-400">{friend.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
