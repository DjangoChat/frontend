import {
  Group as GroupIcon,
  Lock as LockIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"

type FeatureCardProps = {
  icon: React.ReactNode
  title: unknown
  description: unknown
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Stack sx={{ gap: 1.5, alignItems: "center", textAlign: "center" }}>
      <Box
        sx={{
          color: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography level="title-md" fontWeight="lg">
        {title as string}
      </Typography>
      <Typography
        level="body-sm"
        color="neutral"
        sx={{ maxWidth: { xs: "100%", sm: 280 } }}
      >
        {description as string}
      </Typography>
    </Stack>
  )
}

export const Features = () => {
  const content = useIntlayer("features")

  const features = [
    {
      icon: <LockIcon sx={{ fontSize: 28 }} />,
      title: content.encryption.title,
      description: content.encryption.description,
    },
    {
      icon: <GroupIcon sx={{ fontSize: 28 }} />,
      title: content.groupChats.title,
      description: content.groupChats.description,
    },
    {
      icon: <SendIcon sx={{ fontSize: 28 }} />,
      title: content.instantMessaging.title,
      description: content.instantMessaging.description,
    },
  ]

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Stack sx={{ gap: 5 }}>
          <Divider />
          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            {features.map((feature, index) => (
              <Grid key={index} xs={12} sm={6} md={4}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
          <Divider />
        </Stack>
      </Container>
    </Box>
  )
}
