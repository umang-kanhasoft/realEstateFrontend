import { Box, Container, Grid, Skeleton } from '@mui/material';

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Filter Bar Skeleton */}
      <div className="sticky top-0 z-30 border-b border-gray-200/50 bg-white/80 py-4 backdrop-blur-lg">
        <Container
          maxWidth={false}
          className="mx-auto max-w-[1600px] px-4 md:px-8"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Skeleton
              variant="rounded"
              width={300}
              height={52}
              className="rounded-full"
            />
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={120}
                  height={40}
                  className="rounded-full"
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container
        maxWidth={false}
        className="mx-auto max-w-[1600px] px-4 py-8 md:px-8"
      >
        {/* Header Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton
            variant="rounded"
            width={120}
            height={28}
            className="rounded-full"
          />
        </div>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={9}>
            {[1, 2, 3].map(i => (
              <Box
                key={i}
                className="mb-6 flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <Skeleton variant="rectangular" width={288} height={280} />
                <Box className="flex-1 p-5">
                  <div className="flex justify-between">
                    <div>
                      <Skeleton variant="text" width={200} height={28} />
                      <Skeleton variant="text" width={150} height={20} />
                    </div>
                    <Skeleton variant="text" width={100} height={28} />
                  </div>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={80}
                    className="mt-4 rounded-lg"
                  />
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3].map(j => (
                      <Skeleton
                        key={j}
                        variant="rounded"
                        width={80}
                        height={28}
                        className="rounded-full"
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                    <Skeleton variant="text" width={120} height={24} />
                    <div className="flex gap-2">
                      <Skeleton variant="circular" width={36} height={36} />
                      <Skeleton variant="circular" width={36} height={36} />
                      <Skeleton
                        variant="rounded"
                        width={100}
                        height={36}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </Box>
              </Box>
            ))}
          </Grid>

          {/* Sidebar Skeleton */}
          <Grid item xs={12} lg={3} className="hidden lg:block">
            <Skeleton
              variant="rounded"
              width="100%"
              height={400}
              className="rounded-2xl"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
