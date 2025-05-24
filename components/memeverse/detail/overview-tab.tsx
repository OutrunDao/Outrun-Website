import { Button } from "@/components/ui/button"
import { ChevronsRight } from "lucide-react"

interface OverviewTabProps {
  description: string
  progress?: number
  stage?: string
  mode?: string
  website?: string
  x?: string
  telegram?: string
  discord?: string
  name?: string
  symbol?: string
  genesisFund?: number
}

export function OverviewTab({
  description,
  progress,
  stage,
  mode,
  website,
  x,
  telegram,
  discord,
  name,
  symbol,
  genesisFund = 0,
}: OverviewTabProps) {
  // Check if it's Genesis stage
  const isGenesis = stage === "Genesis"

  // Use friendly highlight style - use cyan for contrast
  const highlightClass = "font-semibold text-cyan-300"

  // Calculate progress bar width
  const calculateProgressWidth = () => {
    if (genesisFund >= 10) {
      return "100%"
    } else {
      return `${(genesisFund / 10) * 100}%`
    }
  }

  // Calculate position of 10 UETH marker line
  const calculateMarkerPosition = () => {
    if (genesisFund <= 10) {
      // If less than 10 UETH, marker line is at the rightmost position
      return "100%"
    } else {
      // If greater than 10 UETH, marker line position is calculated based on current amount
      // Leftmost no more than 1/5, rightmost no more than 4/5
      const position = Math.max(20, Math.min(80, (10 / genesisFund) * 100))
      return `${position}%`
    }
  }

  return (
    <div className="block m-0 p-0" style={{ margin: 0, padding: 0 }}>
      {/* Use two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left card: project info and social links */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)] flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text">
              {name}
            </span>
            {symbol && <span className="text-pink-300 ml-2">{symbol}</span>}
          </h2>
          <p className="text-pink-200/90 mb-6 break-words overflow-auto max-h-[200px]">{description}</p>

          {/* Social media icons */}
          {(website || x || telegram || discord) && (
            <div className="flex space-x-6 mt-auto">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 hover:text-pink-400 transition-colors duration-300 hover:scale-110 transform"
                  aria-label="Website"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </a>
              )}

              {x && (
                <a
                  href={x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 hover:text-pink-400 transition-colors duration-300"
                  aria-label="X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {telegram && (
                <a
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 hover:text-pink-400 transition-colors duration-300"
                  aria-label="Telegram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              )}

              {discord && (
                <a
                  href={discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 hover:text-pink-400 transition-colors duration-300"
                  aria-label="Discord"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.977-.608 1.414a17.27 17.27 0 0 0-5.487 0 12.623 12.623 0 0 0-.617-1.414.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.202 13.202 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right card: Genesis Progress - modified to show in Refund stage as well */}
        {(isGenesis || stage === "Refund") && (
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-pink-300">Genesis Progress</h3>
              {stage !== "Refund" && (
                <Button
                  variant="outline"
                  size="xs"
                  className="bg-black/40 border border-purple-500/40 text-pink-300 hover:bg-purple-900/40 hover:border-pink-400/60 hover:text-pink-200 rounded-full transition-all duration-300 flex items-center text-xs px-3 py-1 h-7"
                >
                  <span className="flex items-center">
                    Next Stage
                    <ChevronsRight className="h-3 w-3 ml-0.5" />
                  </span>
                </Button>
              )}
            </div>

            {/* New progress bar design */}
            <div className="bg-black/60 rounded-full h-4 overflow-hidden mb-2 relative">
              {/* Progress bar fill section */}
              <div
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-full transition-all duration-500"
                style={{ width: calculateProgressWidth() }}
              ></div>

              {/* 10 UETH marker line - only show when Genesis Fund > 10 */}
              {genesisFund > 10 && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-cyan-300 z-10"
                  style={{
                    left: calculateMarkerPosition(),
                    boxShadow: "0 0 10px rgba(34, 211, 238, 0.9)",
                  }}
                ></div>
              )}
            </div>

            {/* Labels below progress bar */}
            <div className="flex justify-between text-sm text-pink-300/70 mb-4">
              {genesisFund > 10 && (
                <span
                  className="text-cyan-300 absolute"
                  style={{ left: calculateMarkerPosition(), transform: "translateX(-50%)" }}
                >
                  10 UETH
                </span>
              )}
              <span className="ml-auto">{genesisFund > 10 ? `${genesisFund.toFixed(2)} UETH` : "10 UETH"}</span>
            </div>

            {/* Add description text with cyan highlights for contrast */}
            <p className="text-xs text-pink-200/80 mt-4 leading-tight">
              {stage === "Refund" ? (
                <>
                  Unfortunately, the Genesis Fund for <span className={highlightClass}>{symbol || "Memecoin"}</span>{" "}
                  only reached <span className={highlightClass}>{genesisFund.toFixed(2)} UETH</span>, falling short of
                  the <span className={highlightClass}>10 UETH</span> target. The Memeverse has entered the{" "}
                  <span className={highlightClass}>Refund Stage</span>, allowing Genesis users to redeem their deposited{" "}
                  <span className={highlightClass}>UETH</span>.
                </>
              ) : (
                <>
                  At the end of Genesis, if the Genesis Fund reaches or exceeds{" "}
                  <span className={highlightClass}>10 UETH</span>, the Memeverse will enter the Locked Stage, with all
                  Genesis Funds used to deploy <span className={highlightClass}>{symbol || "Memecoin"}</span> and{" "}
                  <span className={highlightClass}>POL</span> (Proof of Liquidity) token liquidity pools, and Genesis
                  users can claim <span className={highlightClass}>POL</span> tokens. If the Genesis Fund falls short of{" "}
                  <span className={highlightClass}>10 UETH</span> by the genesis end time, the Memeverse will enter the
                  Refund Stage, allowing Genesis users to redeem their deposited{" "}
                  <span className={highlightClass}>UETH</span>.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
