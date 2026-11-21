import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import {
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/constants/site";
import { MESSAGES } from "@/constants/messages";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full min-w-0 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-5 py-4 sm:px-8">
        <div className="flex sm:flex-row flex-col gap-2 items-center justify-between text-neutral-500 dark:text-neutral-400">
          <p className="text-sm tracking-tight">
            &copy; {currentYear} {AUTHOR_NAME}. {MESSAGES.FOOTER_RIGHTS}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
              aria-label={MESSAGES.FOOTER_GITHUB_LABEL}
            >
              <GithubIcon size={20} className="text-current" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm text-sm hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label={MESSAGES.FOOTER_LINKEDIN_LABEL}
            >
              <LinkedinIcon size={20} className="text-current" />
            </a>
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="inline-flex items-center hover:opacity-80 transition-opacity"
              aria-label={MESSAGES.FOOTER_EMAIL_LABEL}
            >
              <Mail size={20} className="text-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
