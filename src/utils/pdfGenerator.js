import { jsPDF } from "jspdf";

/**
 * Generates and downloads a beautifully formatted PDF itinerary for a tour package.
 * @param {Object} pkg - The tour package details from the database
 */
export const generateItineraryPDF = (pkg) => {
  if (!pkg) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  let y = 20;

  // Corporate theme branding colors
  const green = [31, 64, 39]; // #1F4027
  const gold = [197, 168, 128]; // #c5a880
  const darkGray = [55, 65, 81]; // Gray 700
  const lightGray = [156, 163, 175]; // Gray 400

  // Draw header block
  const addHeader = () => {
    // Top banner
    doc.setFillColor(...green);
    doc.rect(0, 0, pageWidth, 28, "F");
    
    // Branding
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("KARUYA BHRAMANTEA", margin, 12);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...gold);
    doc.text("PREMIUM TRAVELS & CUSTOM TOUR ITINERARY", margin, 18);

    // Generation timestamp
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    const dateStr = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Itinerary Date: ${dateStr}`, pageWidth - margin - 45, 12);
  };

  // Draw footer block
  const addFooter = (pageNumber, totalPages) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    
    // Horizontal divider line above footer
    doc.setDrawColor(229, 231, 235); // Gray 200
    doc.setLineWidth(0.4);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    doc.text("Karuya BhramanTea CRM & Travels | admin@karuyabhramantea.com", margin, pageHeight - 10);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
  };

  // Check if printing next element overflows page height, adding page if needed
  const checkPageOverflow = (heightNeeded) => {
    if (y + heightNeeded > pageHeight - 20) {
      doc.addPage();
      addHeader();
      y = 40; // Spacing below header banner
    }
  };

  // --- START GENERATING CONTENT ---

  // Page 1 Setup
  addHeader();
  y = 42;

  // Tour Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...green);
  const splitTitle = doc.splitTextToSize(pkg.title.toUpperCase(), contentWidth);
  doc.text(splitTitle, margin, y);
  y += (splitTitle.length * 8) + 4;

  // Accent divider line
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Metadata Panel
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...darkGray);
  
  // Destination
  doc.text("Destination:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(pkg.destination || "N/A", margin + 26, y);

  // Duration
  doc.setFont("helvetica", "bold");
  doc.text("Duration:", margin + 95, y);
  doc.setFont("helvetica", "normal");
  doc.text(pkg.duration || "N/A", margin + 115, y);
  y += 7;

  // Capacity
  doc.setFont("helvetica", "bold");
  doc.text("Max Capacity:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(`${pkg.maxPeople || 1} Traveler(s)`, margin + 26, y);

  // Pricing
  doc.setFont("helvetica", "bold");
  doc.text("Cost Per Head:", margin + 95, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...gold);
  doc.text(`$${pkg.price}`, margin + 124, y);
  
  if (pkg.discountPrice > 0 && pkg.discountPrice !== pkg.price) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightGray);
    doc.setFontSize(8.5);
    doc.text(`(Was $${pkg.discountPrice})`, margin + 142, y);
  }
  y += 12;

  // Reset text color
  doc.setTextColor(...darkGray);

  // Tour Description
  if (pkg.description || pkg.shortDescription) {
    checkPageOverflow(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...green);
    doc.text("TOUR OVERVIEW", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...darkGray);
    const descText = pkg.description || pkg.shortDescription;
    const splitDesc = doc.splitTextToSize(descText, contentWidth);
    
    // Draw description lines
    doc.text(splitDesc, margin, y);
    y += (splitDesc.length * 5) + 10;
  }

  // Inclusions & Exclusions Columns
  const hasInclusions = pkg.inclusions && pkg.inclusions.length > 0;
  const hasExclusions = pkg.exclusions && pkg.exclusions.length > 0;

  if (hasInclusions || hasExclusions) {
    checkPageOverflow(40);
    const colWidth = (contentWidth / 2) - 5;
    let startY = y;
    
    // Column 1: Inclusions
    if (hasInclusions) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...green);
      doc.text("WHAT'S INCLUDED", margin, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...darkGray);
      
      pkg.inclusions.forEach(inc => {
        checkPageOverflow(6);
        doc.text(`\u2713  ${inc}`, margin, y); // Checkmark symbol
        y += 5.5;
      });
    }

    // Column 2: Exclusions
    let col2Y = startY;
    if (hasExclusions) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...green);
      doc.text("WHAT'S EXCLUDED", margin + colWidth + 10, col2Y);
      col2Y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...darkGray);

      pkg.exclusions.forEach(exc => {
        // If exclusions column overflows page boundaries separately
        if (col2Y + 6 > pageHeight - 20) {
          doc.addPage();
          addHeader();
          col2Y = 40;
        }
        doc.text(`\u2717  ${exc}`, margin + colWidth + 10, col2Y); // Cross symbol
        col2Y += 5.5;
      });
    }

    y = Math.max(y, col2Y) + 10;
  }

  // Day-by-Day Itinerary List
  if (pkg.itinerary && pkg.itinerary.length > 0) {
    checkPageOverflow(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...green);
    doc.text("DAILY ITINERARY DETAILS", margin, y);
    y += 8;

    pkg.itinerary.forEach(day => {
      const dayHeader = `Day ${day.day}: ${day.title}`;
      const splitDayDesc = doc.splitTextToSize(day.description || "", contentWidth - 8);
      const heightNeeded = 6 + (splitDayDesc.length * 5) + 8;

      checkPageOverflow(heightNeeded);

      // Day Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(...green);
      doc.text(dayHeader, margin, y);
      y += 5.5;

      // Day Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...darkGray);
      doc.text(splitDayDesc, margin + 4, y);
      y += (splitDayDesc.length * 5) + 6;
    });
  }

  // Append page numbers to footer of all generated pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  // Trigger Save/Download
  const cleanTitle = pkg.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  doc.save(`${cleanTitle}-itinerary.pdf`);
};
