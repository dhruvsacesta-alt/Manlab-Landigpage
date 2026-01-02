export const calculateDiagnosis = (answers) => {
    let agaScore = 0;
    let teScore = 0;
    let sdScore = 0;

    // Q2: Duration
    // < 3 months -> TE +2
    // 3-6 months -> TE +1
    // > 12 months -> AGA +2
    if (answers.duration === 'less_3_months') teScore += 2;
    if (answers.duration === '3_6_months') teScore += 1;
    if (answers.duration === 'more_12_months') agaScore += 2;

    // Q3: Pattern (Multi)
    // Front/Temples -> AGA +3
    // Crown -> AGA +2
    // Diffuse -> TE +2
    // Shower/Comb only -> TE +1
    if (answers.pattern?.includes('front_temples')) agaScore += 3;
    if (answers.pattern?.includes('crown')) agaScore += 2;
    if (answers.pattern?.includes('diffuse')) teScore += 2;
    if (answers.pattern?.includes('shower_only')) teScore += 1;

    // Q4: Hairline Recession
    // Yes -> AGA +2
    // Slightly -> AGA +1
    if (answers.hairline === 'yes') agaScore += 2;
    if (answers.hairline === 'slightly') agaScore += 1;

    // Q5: Shedding
    // Sudden/Heavy -> TE +3
    // Mild/Consistent -> TE +1
    // Gradual -> AGA +1
    if (answers.shedding === 'sudden') teScore += 3;
    if (answers.shedding === 'mild') teScore += 1;
    if (answers.shedding === 'gradual') agaScore += 1;

    // Q6: Triggers (Multi)
    // Fever/Infection -> TE +3
    // Stress -> TE +2
    // Diet/Weight -> TE +2
    // Meds/Chemo -> TE +3
    // Surgery -> TE +2
    if (answers.triggers?.includes('fever')) teScore += 3;
    if (answers.triggers?.includes('stress')) teScore += 2;
    if (answers.triggers?.includes('diet')) teScore += 2;
    if (answers.triggers?.includes('meds')) teScore += 3;
    if (answers.triggers?.includes('surgery')) teScore += 2;

    // Q7: Scalp Symptoms (Multi) - SD Score
    // White flakes -> SD +3
    // Yellow flakes -> SD +3
    // Itching -> SD +2
    // Redness -> SD +2
    if (answers.scalp?.includes('white_flakes')) sdScore += 3;
    if (answers.scalp?.includes('yellow_flakes')) sdScore += 3;
    if (answers.scalp?.includes('itching')) sdScore += 2;
    if (answers.scalp?.includes('redness')) sdScore += 2;

    // Q8: Family History
    // Father -> AGA +2
    // Mother -> AGA +2
    // Sibling -> AGA +1
    // Grandparents -> AGA +1
    if (answers.family?.includes('father')) agaScore += 2;
    if (answers.family?.includes('mother')) agaScore += 2;
    if (answers.family?.includes('sibling')) agaScore += 1;
    if (answers.family?.includes('grandparents')) agaScore += 1;

    // Q10: Description
    // A (Normal/Shedding) -> TE +1
    // B (Flakes/Itch) -> SD +3
    // C (Redness/Itch) -> SD +2
    // D (Thinning Front) -> AGA +2
    // E (Scalp Fine/Weak) -> TE +2
    if (answers.description === 'A') teScore += 1;
    if (answers.description === 'B') sdScore += 3;
    if (answers.description === 'C') sdScore += 2;
    if (answers.description === 'D') agaScore += 2;
    if (answers.description === 'E') teScore += 2;

    // --- CLASSIFICATION LOGIC ---

    // Determine Primary Type
    let type = 'Unclassified';

    // A) AGA Dominant
    if (agaScore >= 5 && agaScore >= teScore + 2) {
        type = 'AGA';
    }
    // B) TE Dominant
    else if (teScore >= 5 && teScore >= agaScore + 2) {
        type = 'TE';
    }
    // C) Mixed
    else if (agaScore >= 4 && teScore >= 4 && Math.abs(agaScore - teScore) <= 1) {
        type = 'Mixed (AGA + TE)';
    } else {
        // Fallback based on higher score or default
        type = agaScore > teScore ? 'AGA' : 'TE';
    }

    // Determine SD Status
    let sdStatus = 'No SD';
    if (sdScore >= 4) sdStatus = 'Active SD';
    else if (sdScore >= 2) sdStatus = 'Mild SD';

    // Calculate AGA Severity (only if AGA or Mixed)
    // Re-calculating specific severity points as per requirements
    let severityScore = 0;

    // Pattern
    const isFront = answers.pattern?.includes('front_temples');
    const isCrown = answers.pattern?.includes('crown');
    if (isFront && isCrown) severityScore += 5;
    else if (isFront) severityScore += 3;
    else if (isCrown) severityScore += 2;

    // Hairline
    if (answers.hairline === 'yes') severityScore += 3;
    if (answers.hairline === 'slightly') severityScore += 1;

    // Duration
    if (answers.duration === 'more_24_months') severityScore += 2; // Assuming new option 'more_24_months' or mapping 'more_12_months'
    else if (answers.duration === '12_24_months') severityScore += 1;

    // Gradual
    if (answers.shedding === 'gradual') severityScore += 1;

    // Family
    if (answers.family?.includes('father') || answers.family?.includes('mother')) severityScore += 1;
    else if (answers.family?.includes('sibling') || answers.family?.includes('grandparents')) severityScore += 0.5;

    // Visible Front
    if (answers.description === 'D') severityScore += 2;

    // Photo (Simulated) - Assuming a mock score passed or default
    // severityScore += 3; // From prompt example

    // Cap at 10
    severityScore = Math.min(severityScore, 10);

    let stage = 'Mild';
    if (severityScore >= 7) stage = 'Severe';
    else if (severityScore >= 4) stage = 'Moderate';

    return {
        type,
        sdStatus,
        severity: stage,
        scores: { aga: agaScore, te: teScore, sd: sdScore, severity: severityScore }
    };
};
