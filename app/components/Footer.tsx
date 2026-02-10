import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-bg-secondary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🧠</span>
                            <span className="text-xl font-black tracking-tight">
                                <span className="gradient-text">Ohio</span>
                                <span className="text-white"> Drip</span>
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm max-w-md leading-relaxed">
                            The #1 source for brainrot merch. From Skibidi Toilet to Bombardiro Crocodilo —
                            we&apos;ve got the most unhinged products on the internet. 🔥
                        </p>
                        <div className="flex gap-4 mt-6">
                            {["TikTok", "Instagram", "Twitter"].map((social) => (
                                <span
                                    key={social}
                                    className="text-xs text-text-secondary hover:text-neon-green transition-colors cursor-pointer"
                                >
                                    {social}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Shop</h4>
                        <ul className="space-y-2">
                            {["All Products", "Italian Brainrot", "Skibidi Collection", "Sigma Essentials", "Ohio Specials"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="/shop"
                                            className="text-sm text-text-secondary hover:text-neon-green transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Info</h4>
                        <ul className="space-y-2">
                            {["About Us", "Shipping", "Returns", "Contact", "FAQ"].map((item) => (
                                <li key={item}>
                                    <span className="text-sm text-text-secondary hover:text-neon-green transition-colors cursor-pointer">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-secondary">
                        © 2026 Ohio Drip. All rights reserved.
                    </p>
                    <p className="text-xs text-text-secondary">
                        Powered by Brainrot 🧠 | Built with 💜 & zero attention span
                    </p>
                </div>
            </div>
        </footer>
    );
}
