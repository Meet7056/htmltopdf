const app = require("express")();

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

app.get("/api/", async (req, res) => {
  try {
    // Launch Puppeteer to create a PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Example HTML content
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Cookie&family=Corinthia:wght@400;700&family=Gaegu&family=IM+Fell+Double+Pica:ital@0;1&family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Jim+Nightshade&family=Kaisei+HarunoUmi&family=Kirang+Haerang&family=KoHo:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kreon:wght@300..700&family=Kufam:ital,wght@0,400..900;1,400..900&family=La+Belle+Aurore&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Outfit:wght@100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Patrick+Hand&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Signika:wght@300..700&family=Slabo+27px&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Ubuntu+Condensed&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    </head>
    <body style="justify-content: center; align-items: center; display: flex; background: white;">
        <div style="width:550px;height:943px;justify-content:center;align-items:center;display:flex; border-radius: 10px; border: 1px solid lightgray; box-shadow: 0px 1px 20px 1px; margin-top: 20px;">
        <div style="width:550px;height:943px;justify-content:center;align-items:center;display:flex"><div style="border:1px solid black;width:550px;height:943px;position:relative;overflow:hidden"><div style="position:absolute;left:0.44999999999998863px;top:-3.039999999999992px;width:550px;height:943px;transform:scale(1, 1);transform-origin:0 0"><img src="https://cdn.brandingprofitable.com/upload/66065d04e3da5fraes.png" style="width:100%;height:100%" alt="Static Image"/></div><div style="position:absolute;left:187.63px;top:86.44px;width:180px;height:180px;transform:scale(1, 1);transform-origin:0 0"><img src="https://cdn.brandingprofitable.com/upload/65d82fc6b1a1aprofile%20(1).png?auto=compress&amp;cs=tinysrgb&amp;h=30" style="width:100%;height:100%" alt="Static Image"/></div><div style="position:absolute;left:120.32999999999998px;top:824.75px;width:227px;height:227px;transform:scale(0.4, 0.4);transform-origin:0 0"><a href="WhatsappLink"><img src="https://cdn.brandingprofitable.com/upload/6606644eac2b5set-popular-social-media-icons-logos-facebook-instagram-twitter-whatsapp-youtube-pinterest-element-vector-white-background-167847641__2_-removebg-preview.png" alt="Static Image"/></a></div><div style="position:absolute;left:229.45000000000005px;top:822.09px;width:232px;height:232px;transform:scale(0.43, 0.43);transform-origin:0 0"><a href="https://www.youtube.com"><img src="https://cdn.brandingprofitable.com/upload/6606645f98833set-popular-social-media-icons-logos-facebook-instagram-twitter-whatsapp-youtube-pinterest-element-vector-white-background-167847641__3_-removebg-preview.png" alt="Static Image"/></a></div><div style="position:absolute;left:346.65999999999997px;top:826.43px;width:216px;height:216px;transform:scale(0.4, 0.4);transform-origin:0 0"><a href="TwitterLink"><img src="https://cdn.brandingprofitable.com/upload/6606647696e24set-popular-social-media-icons-logos-facebook-instagram-twitter-whatsapp-youtube-pinterest-element-vector-white-background-167847641-removebg-preview.png" alt="Static Image"/></a></div><div style="position:absolute;left:44.670000000000016px;top:436.09000000000003px;color:#ffffff;font-family:Kufam;font-size:44.636544787393966px;text-align:center;transform-origin:0 0;width:491.89px;transform:rotate(0deg)">Your Name Here</div><div style="position:absolute;left:164.27999999999997px;top:489.25px;color:#ff4444;font-family:Patrick Hand;font-size:28.74155535187874px;text-align:center;transform-origin:0 0;width:238.57px;transform:rotate(0deg)">Your Designation</div><div style="position:absolute;left:59.72000000000003px;top:603.54px;color:#ffffff;font-family:Patrick Hand;font-size:31.442968835879523px;text-align:left;transform-origin:0 0;width:309.68px;transform:rotate(0deg)">Your Email Here</div><div style="position:absolute;left:58.73000000000002px;top:653.14px;color:#ffffff;font-family:Patrick Hand;font-size:31.442968835879523px;text-align:left;transform-origin:0 0;width:309.68px;transform:rotate(0deg)"><a href="PhoneLink" style="text-decoration:none;color:#333333">1234567890</a></div><div style="position:absolute;left:62.22000000000003px;top:697.87px;color:#ffffff;font-family:Patrick Hand;font-size:31.442968835879523px;text-align:left;transform-origin:0 0;width:309.68px;transform:rotate(0deg)">Your Adress Here</div></div></div>
        </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent);

    // Generate PDF and convert to a buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Convert the buffer to base64
    const pdfBase64 = pdfBuffer.toString("base64");

    // Close Puppeteer browser
    await browser.close();

    // Send the base64-encoded PDF in a JSON response
    res.json({
      base64pdf: pdfBase64,
    });

  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

app.post("/api/", async (req, res) => {
  try {
    // Launch Puppeteer to create a PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Example HTML content
    const htmlContent = req.body.htmlContent;

    await page.setContent(htmlContent);

    // Generate PDF and convert to a buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Convert the buffer to base64
    const pdfBase64 = pdfBuffer.toString("base64");

    // Close Puppeteer browser
    await browser.close();

    // Send the base64-encoded PDF in a JSON response
    res.json({
      base64pdf: pdfBase64,
    });

  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

app.get("/", async (req, res) => {
  try {
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      res.send("production");

    } else {

      res.send("local");
    }
  } catch (err) {
    res.send("getting error");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

module.exports = app;