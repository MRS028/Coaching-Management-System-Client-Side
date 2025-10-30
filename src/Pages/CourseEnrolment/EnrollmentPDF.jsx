import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Bengali font
Font.register({
  family: "Bangla",
  src: "/fonts/kalpurush.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Bangla",
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 12,
    borderBottom: "1.5pt solid #1e40af",
  },
  logoContainer: {
    width: "15%",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: "#1e40af",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerText: {
    width: "85%",
    paddingLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 1,
  },
  contact: {
    fontSize: 7,
    color: "#6b7280",
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#dc2626",
    backgroundColor: "#fef2f2",
    padding: 6,
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 3,
    border: "1pt solid #fecaca",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftColumn: {
    width: "48%",
  },
  rightColumn: {
    width: "48%",
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 5,
    paddingBottom: 2,
    borderBottom: "1pt solid #93c5fd",
    backgroundColor: "#f8fafc",
    padding: 3,
    borderRadius: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    paddingVertical: 1,
  },
  label: {
    width: "45%",
    fontWeight: "bold",
    color: "#374151",
    fontSize: 8,
  },
  value: {
    width: "53%",
    textAlign: "left",
    color: "#1f2937",
    fontSize: 8,
  },
  highlightRow: {
    backgroundColor: "#f0f9ff",
    padding: 2,
    borderRadius: 2,
  },
  paymentSection: {
    marginBottom: 8,
  },
  paymentBox: {
    backgroundColor: "#f0fdf4",
    padding: 6,
    border: "1pt solid #86efac",
    borderRadius: 3,
    marginBottom: 6,
  },
  totalAmount: {
    backgroundColor: "#dcfce7",
    padding: 4,
    borderRadius: 2,
    border: "1pt solid #22c55e",
  },
  notesBox: {
    backgroundColor: "#faf5ff",
    padding: 6,
    border: "1pt solid #c4b5fd",
    borderRadius: 3,
    marginBottom: 6,
  },
  noteItem: {
    marginBottom: 2,
    fontSize: 8,
  },
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTop: "1pt dashed #d1d5db",
  },
  signature: {
    width: "45%",
    textAlign: "center",
    paddingTop: 8,
  },
  signatureLine: {
    borderTop: "1pt solid #9ca3af",
    width: "80%",
    marginTop: 10,
    marginBottom: 4,
    alignSelf: "center",
  },
  footer: {
    textAlign: "center",
    marginTop: 8,
    borderTop: "0.5pt solid #e5e7eb",
    fontSize: 6,
    color: "#6b7280",
    paddingTop: 3,
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "15%",
    right: "15%",
    textAlign: "center",
    color: "rgba(30, 64, 175, 0.08)",
    fontSize: 40,
    fontWeight: "bold",
    transform: "rotate(-30deg)",
  },
  statusBadge: {
    backgroundColor: "#22c55e",
    color: "white",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    fontSize: 7,
    fontWeight: "bold",
  },
});

const EnrollmentPDF = ({
  enrollmentData,
  course,
  totalAmount,
  currentDate,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>অধ্যয়ন কোচিং</Text>

      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>অ</Text>
          </View>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>অধ্যয়ন কোচিং সেন্টার</Text>
          <Text style={styles.subtitle}>
            মানসম্মত শিক্ষার জন্য আস্থার ঠিকানা
          </Text>
          <Text style={styles.contact}>
            সাভার, ঢাকা | মোবাইল: 01955554414 | ইমেইল: info@oddhayon.com
          </Text>
        </View>
      </View>

      {/* Enrollment Title */}
      <Text style={styles.receiptTitle}>কোর্স এনরোলমেন্ট কনফার্মেশন রিসিট</Text>

      {/* Two Column Layout - Student Info & Educational Info */}
      <View style={styles.twoColumnContainer}>
        {/* Left Column - Student Information */}
        <View style={styles.leftColumn}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>ছাত্র/ছাত্রীর তথ্য</Text>
            {[
              ["স্টুডেন্ট আইডি:", enrollmentData.studentID],
              ["অ্যাডমিশন আইডি:", enrollmentData.admissionId || "N/A"],
              ["পুরো নাম:", enrollmentData.name],
              ["ইমেইল:", enrollmentData.email],
              ["মোবাইল:", enrollmentData.phone],
              ["বয়স:", `${enrollmentData.age} বছর`],
              ["লিঙ্গ:", enrollmentData.gender],
              ["ঠিকানা:", enrollmentData.address],
            ].map(([label, value], i) => (
              <View
                style={[styles.row, i % 2 === 0 ? styles.highlightRow : {}]}
                key={i}
              >
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right Column - Educational Information */}
        <View style={styles.rightColumn}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>শিক্ষাগত তথ্য</Text>
            {[
              ["শিক্ষাপ্রতিষ্ঠান:", enrollmentData.schoolName],
              ["শ্রেণী:", enrollmentData.class],
              ["ভার্সন:", enrollmentData.version],
              ["কোর্স নাম:", course.title],
              ["কোর্স ফি:", `${course.fee} টাকা`],
              ["এনরোলমেন্ট তারিখ:", currentDate],
            ].map(([label, value], i) => (
              <View
                style={[styles.row, i % 2 === 0 ? styles.highlightRow : {}]}
                key={i}
              >
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Payment Info - Full Width */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>পেমেন্ট তথ্য</Text>
        <View style={styles.paymentBox}>
          {[
            ["কোর্স ফি:", `${course.fee} টাকা`],
            ["রেজিস্ট্রেশন ফি:", "৫০০ টাকা"],
            ["মোট পরিশোধিত:", `${totalAmount} টাকা`],
            ["পেমেন্ট স্ট্যাটাস:", "Paid"],
            [
              "পেমেন্ট মাধ্যম:",
              enrollmentData.paymentMethod === "bkash"
                ? "বিকাশ"
                : enrollmentData.paymentMethod === "nagad"
                ? "নগদ"
                : enrollmentData.paymentMethod === "bank"
                ? "ব্যাংক"
                : "নগদ",
            ],
          ].map(([label, value], i) => (
            <View style={styles.row} key={i}>
              <Text
                style={[
                  styles.label,
                  i === 2 ? { color: "#065f46", fontWeight: "bold" } : {},
                ]}
              >
                {label}
              </Text>
              <View style={{ width: "53%", alignItems: "flex-start" }}>
                {i === 3 ? (
                  <Text style={styles.statusBadge}>{value}</Text>
                ) : (
                  <Text
                    style={[
                      styles.value,
                      i === 2
                        ? { color: "#065f46", fontWeight: "bold", fontSize: 9 }
                        : {},
                    ]}
                  >
                    {value}
                  </Text>
                )}
              </View>
            </View>
          ))}

          {enrollmentData.transactionId && (
            <View style={styles.row}>
              <Text style={styles.label}>ট্রানজেকশন আইডি:</Text>
              <Text style={[styles.value, { fontFamily: "Courier" }]}>
                {enrollmentData.transactionId}
              </Text>
            </View>
          )}

          <View style={styles.totalAmount}>
            <View style={styles.row}>
              <Text style={[styles.label, { color: "#065f46", fontSize: 9 }]}>
                মোট টাকার কথায়:
              </Text>
              <Text style={[styles.value, { color: "#065f46", fontSize: 8 }]}>
                {totalAmount} টাকা মাত্র
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Notes - Full Width */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>পরবর্তী ধাপ ও নির্দেশনা</Text>
        <View style={styles.notesBox}>
          {[
            "• আমাদের অফিস থেকে শীঘ্রই আপনার সাথে যোগাযোগ করা হবে",
            "• ক্লাস শুরুর তারিখ ও সময় সম্পর্কে আপনাকে জানানো হবে",
            "• এনরোলমেন্ট সম্পর্কিত যেকোনো তথ্যের জন্য কল করুন: 01955554414",
            "• এই রিসিটটি সংরক্ষণ করুন, ভবিষ্যতে প্রয়োজন হবে",
            "• নিয়মিত ক্লাসে উপস্থিতি বাধ্যতামূলক (৮০% উপস্থিতি)",
            "• কোর্স ফি পরবর্তী মাসের ১০ তারিখের মধ্যে পরিশোধ করতে হবে",
          ].map((note, i) => (
            <Text style={styles.noteItem} key={i}>
              {note}
            </Text>
          ))}
        </View>
      </View>

      {/* Signatures */}
      <View style={styles.signatureSection}>
        <View style={styles.signature}>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>আব্দুল হাকিম</Text>
          <Text style={{ fontSize: 7, marginBottom: 12 }}>
            প্রতিষ্ঠাতা ও পরিচালক
          </Text>
          <View style={styles.signatureLine} />
          <Text style={{ fontSize: 7, marginTop: 3 }}>
            অধ্যয়ন কোচিং সেন্টার
          </Text>
        </View>

        <View style={styles.signature}>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
            ছাত্র/ছাত্রীর স্বাক্ষর
          </Text>
          <Text style={{ fontSize: 7, marginBottom: 12 }}>
            তারিখ: {currentDate}
          </Text>
          <View style={styles.signatureLine} />
          <Text style={{ fontSize: 7, marginTop: 3 }}>স্বাক্ষর ও তারিখ</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          এই রিসিটটি কম্পিউটার জেনারেটেড এবং অফিসিয়াল সিলের প্রয়োজন নেই |
          রেফারেন্স: {enrollmentData.studentID}
        </Text>
        <Text>
          প্রিন্টের তারিখ: {currentDate} -{" "}
          {new Date().toLocaleTimeString("bn-BD")} | পৃষ্ঠা: 1/1
        </Text>
      </View>
    </Page>
  </Document>
);

export default EnrollmentPDF;
