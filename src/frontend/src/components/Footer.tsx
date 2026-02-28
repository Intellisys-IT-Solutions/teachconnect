import { GraduationCap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary/60" />
            <span className="text-sm font-semibold text-primary">
              TeachConnect
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>Global Teacher Recruitment Platform</span>
            <span className="hidden sm:block text-border">|</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              © {year}. Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
