document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyReferral");
  const referralInput = document.getElementById("referralCode");

  if (copyBtn && referralInput) {
    copyBtn.addEventListener("click", () => {
      referralInput.select();
      document.execCommand("copy");
      alert("Referral code copied ✅");
    });
  }

  const inviteForm = document.getElementById("inviteForm");
  if (inviteForm) {
    inviteForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("inviteEmail").value;
      alert(`Invite sent to ${email} 🚀`);
      inviteForm.reset();
    });
  }
});