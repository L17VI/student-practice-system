import { Box, Typography, Stack, Grid, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useEffect, useRef, useCallback, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{
            width: '100%',
            backgroundColor: '#5d6bc4',
            borderRadius: '16px',
            overflow: 'hidden',
        }}>
            <Grid container alignItems="center">
                <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 4 } }}>
                    <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} component="h1" sx={{ color: '#FFFFFF', fontWeight: 'bold', lineHeight: 1.2 }}>
                            Наш сервис —
                        </Typography>
                        <Typography variant={isMobile ? "h6" : "h5"} component="span" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            полигон для амбиций
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 2 }}>
                        Студенты погружаются в реальные проекты от настоящих компаний, а работодатели находят таланты.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{
                    display: { xs: 'none', md: 'flex' },
                    minHeight: '143px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        Фото
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const TopCompaniesSection = () => (
    <Box sx={{
        width: '100%',
        minHeight: '272px',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: '16px',
        py: { xs: 4, md: '68px' },
        px: { xs: 2, md: 0 },
    }}>
        <Grid container spacing={{ xs: 2, md: '21px' }} justifyContent="center">
            {[1, 2, 3].map((item) => (
                <Grid item key={item} xs={12} sm={6} md="auto">
                    <Box sx={{
                        width: '195px',
                        height: '183px',
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        borderRadius: '16px',
                        mx: 'auto',
                    }} />
                </Grid>
            ))}
        </Grid>
    </Box>
);

const PracticesCarousel = () => {
    const carouselRef = useRef(null);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const theme = useTheme();

    const practices = [
        { id: 1, title: "Практика 1" },
        { id: 2, title: "Практика 2" },
        { id: 3, title: "Практика 3" },
        { id: 4, title: "Практика 4" },
        { id: 5, title: "Практика 5" },
        { id: 6, title: "Практика 6" },
        { id: 7, title: "Практика 7" },
        { id: 8, title: "Практика 8" },
    ];

    const gap = 20; // Gap between items
    const itemHeight = 250; // Fixed height for vertical feel

    const getItemsPerPage = useCallback((carouselVisibleWidth) => {
        if (carouselVisibleWidth < theme.breakpoints.values.sm) { // xs
            return 2; // Show 2 items on very small screens
        } else if (carouselVisibleWidth < theme.breakpoints.values.md) { // sm
            return 3; // Show 3 items on small to medium screens
        } else { // md and up
            return 4; // Show 4 items on larger screens
        }
    }, [theme.breakpoints.values.sm, theme.breakpoints.values.md]);

    const calculateItemWidth = useCallback((carouselVisibleWidth, numItemsPerPage) => {
        if (numItemsPerPage === 0) return 0;
        return (carouselVisibleWidth - (numItemsPerPage - 1) * gap) / numItemsPerPage;
    }, [gap]);

    const [calculatedItemWidth, setCalculatedItemWidth] = useState(0);
    const [minDragBound, setMinDragBound] = useState(0);
    const [maxDragBound, setMaxDragBound] = useState(0);
    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

    const calculateBoundsAndItemWidth = useCallback(() => {
        if (!carouselRef.current) return;

        const carouselVisibleWidth = carouselRef.current.offsetWidth;
        const currentItemsPerPage = getItemsPerPage(carouselVisibleWidth);
        const currentItemWidth = calculateItemWidth(carouselVisibleWidth, currentItemsPerPage);
        setCalculatedItemWidth(currentItemWidth);

        const contentTotalWidth = practices.length * currentItemWidth + (practices.length - 1) * gap;

        if (contentTotalWidth > carouselVisibleWidth) {
            setMinDragBound(carouselVisibleWidth - contentTotalWidth);
            setMaxDragBound(0);
        } else {
            setMinDragBound(0);
            setMaxDragBound(0);
        }
        
        const currentXValue = x.get();
        if (currentXValue < minDragBound || currentXValue > maxDragBound) {
            const newX = Math.max(minDragBound, Math.min(maxDragBound, currentXValue));
            x.set(newX);
            setCurrentScrollPosition(newX);
        }

    }, [practices.length, gap, getItemsPerPage, calculateItemWidth, x, minDragBound, maxDragBound, theme.breakpoints.values.sm, theme.breakpoints.values.md]);

    useEffect(() => {
        calculateBoundsAndItemWidth();
        const handleResize = () => calculateBoundsAndItemWidth();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [calculateBoundsAndItemWidth]);

    const handleDragEnd = (event, info) => {
        const velocity = info.velocity.x;
        const currentX = x.get();

        const targetX = currentX + velocity * 0.5;

        let finalX = targetX;
        if (finalX < minDragBound) finalX = minDragBound;
        if (finalX > maxDragBound) finalX = maxDragBound;

        controls.start({
            x: finalX,
            transition: {
                type: "spring",
                velocity: velocity,
                stiffness: 300,
                damping: 40,
                mass: 1,
                restDelta: 0.5,
                restSpeed: 10,
            }
        });
        setCurrentScrollPosition(finalX);
    };

    const scrollCarousel = useCallback((direction) => {
        const currentX = x.get();
        const step = calculatedItemWidth + gap;
        let targetX;

        if (direction === 'prev') {
            targetX = currentX + step;
        } else {
            targetX = currentX - step;
        }

        let finalX = targetX;
        if (finalX < minDragBound) finalX = minDragBound;
        if (finalX > maxDragBound) finalX = maxDragBound;

        controls.start({
            x: finalX,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        });
        setCurrentScrollPosition(finalX);
    }, [x, controls, minDragBound, maxDragBound, calculatedItemWidth, gap]);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const unsubscribe = x.on("change", (latestX) => {
            const tolerance = 1;
            setCanScrollLeft(latestX < maxDragBound - tolerance);
            setCanScrollRight(latestX > minDragBound + tolerance);
        });
        setCanScrollLeft(x.get() < maxDragBound - 1);
        setCanScrollRight(x.get() > minDragBound + 1);
        return () => unsubscribe();
    }, [x, minDragBound, maxDragBound]);

    const handlePracticeClick = (practiceId) => {
        console.log(`Нажата практика: ${practiceId}`);
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '845px',
            py: 4,
            px: { xs: 2, md: 0 },
            overflow: 'hidden',
            position: 'relative',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    Рулетка Практик
                </Typography>
                <Box>
                    <IconButton
                        onClick={() => scrollCarousel('prev')}
                        disabled={!canScrollLeft}
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => scrollCarousel('next')}
                        disabled={!canScrollRight}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
            <motion.div
                ref={carouselRef}
                style={{ x, display: 'flex', gap: `${gap}px` }}
                drag="x"
                dragConstraints={{ left: minDragBound, right: maxDragBound }}
                onDragEnd={handleDragEnd}
                animate={controls}
                whileTap={{ cursor: "grabbing" }}
                dragElastic={0.2}
            >
                {practices.map(practice => (
                    <Box
                        key={practice.id}
                        onClick={() => handlePracticeClick(practice.id)}
                        sx={{
                            minWidth: `${calculatedItemWidth}px`,
                            height: `${itemHeight}px`, // Vertical height
                            backgroundColor: '#e0e0e0',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column', // For vertical content
                            flexShrink: 0,
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }
                        }}
                    >
                        <Typography variant="h6">{practice.title}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>Подробнее...</Typography>
                    </Box>
                ))}
            </motion.div>
        </Box>
    );
};

export const Home = () => {
    return (
        <Stack spacing="24px" alignItems="center">
            <HeroSection />
            <TopCompaniesSection />
            <PracticesCarousel />
        </Stack>
    );
};

export default Home;
