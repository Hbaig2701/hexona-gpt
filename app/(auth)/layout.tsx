export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--hex-dark-900)] hex-pattern">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-gradient">Hexona GPT</h1>
          <p className="text-[var(--hex-text-secondary)] text-sm mt-2">
            AI Agency Operating System
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
