import Avatar from "@mui/joy/Avatar"
import Badge from "@mui/joy/Badge"

type AvatarWithStatusProps = {
  src?: string
  name?: string
  online?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * Avatar with a colored status dot overlay, driven by the participant's
 * `participant_status` field cached in Dexie (see db.tsx / ParticipantBasic).
 */
export const AvatarWithStatus = ({
  src,
  name,
  online = false,
  size = "md",
}: AvatarWithStatusProps) => {
  return (
    <Badge
      color={online ? "success" : "neutral"}
      variant="solid"
      size="sm"
      badgeInset="4%"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "--Badge-ringColor": "var(--joy-palette-background-surface)",
        "--Badge-paddingX": "3px",
      }}
    >
      <Avatar src={src} alt={name} size={size} />
    </Badge>
  )
}
