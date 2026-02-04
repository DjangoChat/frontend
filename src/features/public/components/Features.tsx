import {
  Group as GroupIcon,
  Lock as LockIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"

type FeatureCardProps = {
  icon: React.ReactNode
  title: unknown
  description: unknown
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "lg",
        },
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Box
          sx={{
            bgcolor: "primary.50",
            borderRadius: "50%",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.500",
          }}
        >
          {icon}
        </Box>
        <Typography level="h3" fontSize="xl" fontWeight="lg">
          {title as string}
        </Typography>
        <Typography level="body-md" color="neutral">
          {description as string}
        </Typography>
      </Stack>
    </Card>
  )
}

export const Features = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const content = useIntlayer("features")

  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  const features = [
    {
      icon: <LockIcon sx={{ fontSize: 40 }} />,
      title: content.encryption.title,
      description: content.encryption.description,
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: content.groupChats.title,
      description: content.groupChats.description,
    },
    {
      icon: <SendIcon sx={{ fontSize: 40 }} />,
      title: content.instantMessaging.title,
      description: content.instantMessaging.description,
    },
  ]
  /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.surface" }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography level="h2" fontSize={{ xs: "2rem", md: "3rem" }}>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {content.sectionTitle as unknown as string}
            </Typography>
            <Typography
              level="body-lg"
              color="neutral"
              sx={{ maxWidth: "600px" }}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {content.sectionDescription as unknown as string}
            </Typography>
          </Stack>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid key={index} xs={12} md={4}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}
