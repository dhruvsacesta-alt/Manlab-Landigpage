import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import JourneySteps from '../components/JourneySteps';
import ComparisonTable from '../components/ComparisonTable';
import Timeline from '../components/Timeline';
import ScienceSection from '../components/ScienceSection';
import Diagnostics from '../components/Diagnostics';
import BlogCarousel from '../components/BlogCarousel';
import FAQ from '../components/FAQ';



const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="overflow-x-hidden">
            <Hero />
            <JourneySteps />
            <ComparisonTable />
            <ScienceSection />
            <Timeline />
            <Diagnostics />
            <BlogCarousel />
            <FAQ />

        </div>
    );
};

export default Home;
