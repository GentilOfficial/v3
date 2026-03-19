"use client"

import ContentEmptyState from "@/components/feedback/ContentEmptyState"
import ContentNotice from "@/components/feedback/ContentNotice"
import { motion } from "motion/react"

const ease = [0.25, 0.75, 0.25, 1]

const feedbackMotionProps = {
  initial: { opacity: 0, y: 18, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true },
  transition: { duration: 0.6, ease },
}

export default function RemoteContentState({
  shouldLoad,
  source,
  notice,
  isLoading,
  hasItems,
  skeleton,
  emptyTitle,
  emptyDescription,
  noticeClassName,
  emptyStateClassName,
  children,
}) {
  const showNotice = shouldLoad && source === "fallback" && notice
  const showLoadingState = shouldLoad && isLoading && !hasItems
  const showContent = shouldLoad && hasItems
  const showEmptyState = shouldLoad && !isLoading && !hasItems

  return (
    <>
      {showNotice ? (
        <motion.div {...feedbackMotionProps} className={noticeClassName}>
          <ContentNotice
            title={notice.title}
            description={notice.description}
          />
        </motion.div>
      ) : null}

      {showLoadingState ? (
        skeleton
      ) : showContent ? (
        children
      ) : showEmptyState ? (
        <motion.div {...feedbackMotionProps}>
          <ContentEmptyState
            title={emptyTitle}
            description={emptyDescription}
            className={emptyStateClassName}
          />
        </motion.div>
      ) : null}
    </>
  )
}
