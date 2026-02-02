import {
  Group as GroupIcon,
  Lock as LockIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/joy"

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
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
          {title}
        </Typography>
        <Typography level="body-md" color="neutral">
          {description}
        </Typography>
      </Stack>
    </Card>
  )
}

export const Features = () => {
  const features = [
    {
      icon: <LockIcon sx={{ fontSize: 40 }} />,
      title: "End-to-End Encryption",
      description:
        "Your messages are secured with end-to-end encryption. Only you and the person you're communicating with can read them.",
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: "Group Chats",
      description:
        "Stay connected with family and friends. Create groups to chat with multiple people at once and share moments together.",
    },
    {
      icon: <SendIcon sx={{ fontSize: 40 }} />,
      title: "Instant Messaging",
      description:
        "Send and receive messages instantly. Share photos, videos, documents, and voice messages with anyone, anywhere.",
    },
  ]

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.surface" }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography level="h2" fontSize={{ xs: "2rem", md: "3rem" }}>
              Why Choose Us
            </Typography>
            <Typography
              level="body-lg"
              color="neutral"
              sx={{ maxWidth: "600px" }}
            >
              Discover the features that make our messaging platform the best
              choice for staying connected
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
