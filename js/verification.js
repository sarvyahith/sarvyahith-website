const SUPABASE_URL = "https://xvxpyfcrhypzimsxaudw.supabase.co";
const SUPABASE_KEY = "sb_publishable_a8bomxTUu-n5gxOA3s7Vxg_YOc__2iO";

const openVerification = document.getElementById("openVerification");
const closeVerification = document.getElementById("closeVerification");
const verificationOverlay = document.getElementById("verificationOverlay");

const certificateId = document.getElementById("certificateId");
const verifyCertificate = document.getElementById("verifyCertificate");
const verificationResult = document.getElementById("verificationResult");
const courseCategory = document.getElementById("Category");


/* OPEN POPUP */

openVerification.addEventListener("click", () => {
    verificationOverlay.classList.add("active");
});


/* CLOSE POPUP */

closeVerification.addEventListener("click", () => {
    verificationOverlay.classList.remove("active");
    verificationResult.innerHTML = "";
    certificateId.value = "";
});


/* VERIFY CERTIFICATE */

verifyCertificate.addEventListener("click", async () => {

    const enteredId = certificateId.value.trim();

    if (courseCategory.value === "") {
        verificationResult.innerHTML = `
            <p class="verification-error">
                Please select a  category.
            </p>
        `;
        return;
    }

    if (enteredId === "") {
        verificationResult.innerHTML = `
            <p class="verification-error">
                Please enter a Certificate ID.
            </p>
        `;
        return;
    }

    verificationResult.innerHTML = `
        <p>Checking certificate...</p>
    `;

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/intern_verification?verification_id=eq.${encodeURIComponent(enteredId)}&select=verification_id,name`,
            {
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Verification failed");
        }

       if (data.length > 0) {

    const internName = data[0].name;

    verificationResult.innerHTML = `
        <div class="verification-success">
            <strong>✓ Certificate Verified</strong>
            This certificate belongs to <strong>${internName}</strong>.<br>
            ${internName}  was an intern at Sarvyahith Summer Internship Programme 2026, during the period of 15 june 2026 to 15 august 2026. The submitted internship certificate has been verified against our records and is authentic and validly issued by Sarvyahith Foundation.
        </div>
    `;

} else {

            verificationResult.innerHTML = `
                <p class="verification-error">
                    We regret to inform you that the submitted certificate could not be authenticated against the records available with Sarvyahith. The details provided do not match our official records, or the certificate could not be verified as having been issued by Sarvyahith.
                </p>
            `;
        }

    } catch (error) {

        console.error("Verification error:", error);

        verificationResult.innerHTML = `
            <p class="verification-error">
                Something went wrong. Please try again later.
            </p>
        `;
    }

});