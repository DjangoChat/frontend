import { Box, Typography } from "@mui/joy"

type AuthFooterProps = {
  copyright: string
}

export function AuthFooter({ copyright }: AuthFooterProps) {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Typography level="body-xs" sx={{ textAlign: "center" }}>
        {copyright} {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}
