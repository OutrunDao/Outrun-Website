"use client"

interface LockedOverviewTabProps {
  description: string
  website?: string
  x?: string
  telegram?: string
  discord?: string
  name?: string
  symbol?: string
  image?: string
  omnichain?: Array<{ name: string; chainid: number; icon: string }>
}

export function LockedOverviewTab({
  description,
  website,
  x,
  telegram,
  discord,
  name,
  symbol,
  image,
  omnichain = [],
}: LockedOverviewTabProps) {
  return (
    <div className="block m-0 p-0" style={{ margin: 0, padding: 0 }}>
      {/* Use two-column layout with reduced spacing */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Left side: project image - takes 1/4 width */}
        <div className="md:col-span-1 flex items-start" style={{ width: "220px", height: "220px", overflow: "hidden" }}>
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
            style={{ display: "block", maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>

        {/* Right card: project info and social links - takes 3/4 width, extends left */}
        <div
          className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/40 shadow-[0_4px_20px_-4px_rgba(168,85,247,0.2)] flex flex-col md:col-span-3 -ml-6"
          style={{ height: "220px" }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text">
              {name}
            </span>
            {symbol && <span className="text-pink-300 ml-2">{symbol}</span>}
          </h2>
          <p className="text-pink-200/90 mb-6 break-words overflow-auto max-h-[120px]">{description}</p>

          {/* Social media icons and Available on */}
          {(website || x || telegram || discord || omnichain.length > 0) && (
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-6">
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

              {/* Available on chain info - dynamically get from omnichain array */}
              {omnichain && omnichain.length > 0 && (
                <div className="flex items-center">
                  <span className="text-pink-300 text-sm mr-2">Available on</span>
                  <div className="flex space-x-2">
                    {omnichain.map((chain, index) => (
                      <img
                        key={index}
                        src={chain.icon || "/placeholder.svg"}
                        alt={chain.name}
                        title={chain.name}
                        className="w-5 h-5"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
