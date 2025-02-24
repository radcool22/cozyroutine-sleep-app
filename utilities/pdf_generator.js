function generatePDF(routinePair) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up fonts and colors
        doc.setFont("helvetica");
        doc.setTextColor(45, 27, 105); // Dark purple color

        // Add title
        doc.setFontSize(24);
        doc.text("Cozy Routine", 105, 20, { align: "center" });
        
        // Add subtitle
        doc.setFontSize(16);
        doc.text(`Routine for ${routinePair.childName} (${routinePair.childAge} year old${routinePair.childGender ? ` ${routinePair.childGender}` : ''})`, 105, 30, { align: "center" });
        
        // Add date
        doc.setFontSize(12);
        doc.text(`Created on ${new Date(routinePair.createdAt).toLocaleDateString()}`, 105, 40, { align: "center" });

        // Original Routine Section
        doc.setFontSize(14);
        doc.text("Original Routine", 20, 60);
        
        let yPos = 70;
        routinePair.originalRoutine.steps.forEach(step => {
            doc.setFontSize(12);
            doc.text(`${step.time}: ${step.activity}`, 30, yPos);
            if (step.note) {
                doc.setFontSize(10);
                doc.text(`Note: ${step.note}`, 40, yPos + 5);
                yPos += 10;
            }
            yPos += 10;
        });

        // AI-Enhanced Routine Section
        doc.setFontSize(14);
        yPos += 10;
        doc.text("AI-Enhanced Routine", 20, yPos);
        
        yPos += 10;
        routinePair.aiRoutine.steps.forEach(step => {
            doc.setFontSize(12);
            doc.text(`${step.time}: ${step.activity}`, 30, yPos);
            if (step.note) {
                doc.setFontSize(10);
                doc.text(`Note: ${step.note}`, 40, yPos + 5);
                yPos += 10;
            }
            yPos += 10;
        });

        // Add footer
        doc.setFontSize(10);
        doc.text("Generated by Cozy Routine - Your Personal Sleep Routine Buddy!", 105, 280, { align: "center" });

        // Save the PDF
        doc.save(`cozy-routine-${routinePair.childName}-${routinePair.childAge}yo-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        reportError(error);
        alert('Failed to generate PDF. Please try again.');
    }
}
