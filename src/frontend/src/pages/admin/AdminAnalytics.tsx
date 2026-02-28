import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sampleJobListings, sampleTeachers } from "../../sampleData";

const COLORS = [
  "#3b6cf4",
  "#50b8c8",
  "#6ecb9e",
  "#f4c047",
  "#f47356",
  "#a070d4",
];

export default function AdminAnalytics() {
  // Availability breakdown
  const availabilityData = [
    {
      name: "Available",
      value: sampleTeachers.filter((t) => t.availabilityStatus === "Available")
        .length,
      color: "#6ecb9e",
    },
    {
      name: "Interviewing",
      value: sampleTeachers.filter(
        (t) => t.availabilityStatus === "Interviewing",
      ).length,
      color: "#f4c047",
    },
    {
      name: "Placed",
      value: sampleTeachers.filter((t) => t.availabilityStatus === "Placed")
        .length,
      color: "#3b6cf4",
    },
    {
      name: "Inactive",
      value: sampleTeachers.filter((t) => t.availabilityStatus === "Inactive")
        .length,
      color: "#9ca3af",
    },
  ];

  // Subject demand (count teachers by subject)
  const subjectMapAcc: Record<string, number> = {};
  for (const t of sampleTeachers) {
    for (const s of t.subjects) {
      subjectMapAcc[s] = (subjectMapAcc[s] || 0) + 1;
    }
  }
  const subjectDemand = Object.entries(subjectMapAcc)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([subject, count]) => ({
      subject: subject.length > 12 ? `${subject.substring(0, 12)}…` : subject,
      count,
    }));

  // Pipeline funnel
  const funnelData = [
    { name: "Sourced", value: 24, fill: "#94a3b8" },
    { name: "Screening", value: 18, fill: "#f4c047" },
    { name: "Interview", value: 11, fill: "#3b6cf4" },
    { name: "Offer", value: 7, fill: "#a070d4" },
    { name: "Placed", value: 5, fill: "#6ecb9e" },
  ];

  // Country distribution
  const countryMapAcc: Record<string, number> = {};
  for (const t of sampleTeachers) {
    countryMapAcc[t.country] = (countryMapAcc[t.country] || 0) + 1;
  }
  const countryData = Object.entries(countryMapAcc).map(
    ([name, value], idx) => ({
      name,
      value,
      color: COLORS[idx % COLORS.length],
    }),
  );

  const kpis = [
    {
      label: "Placement Success Rate",
      value: "68%",
      change: "+5% this month",
      positive: true,
    },
    {
      label: "Avg. Days to Fill",
      value: "8.4",
      change: "-1.2 days vs last month",
      positive: true,
    },
    {
      label: "Candidate Retention",
      value: "82%",
      change: "Remain active after placement",
      positive: true,
    },
    {
      label: "School Satisfaction",
      value: "4.7/5",
      change: "Based on 24 reviews",
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Analytics & Reports
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Platform performance metrics and talent insights
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="text-xs text-muted-foreground mb-2">
              {kpi.label}
            </div>
            <div className="font-display text-2xl font-extrabold text-foreground mb-1">
              {kpi.value}
            </div>
            <div
              className={`text-xs font-medium ${kpi.positive ? "text-green-600" : "text-red-600"}`}
            >
              {kpi.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Availability Donut */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <h2 className="font-semibold text-foreground mb-4">
            Candidate Availability
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={availabilityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {availabilityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Teachers"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Demand Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <h2 className="font-semibold text-foreground mb-4">
            Talent by Subject
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={subjectDemand}
              layout="vertical"
              margin={{ left: 8, right: 8 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="subject"
                width={90}
                tick={{ fontSize: 11 }}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="oklch(0.46 0.14 255)"
                radius={[0, 4, 4, 0]}
                name="Teachers"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pipeline Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <h2 className="font-semibold text-foreground mb-4">
            Recruitment Funnel (30 days)
          </h2>
          <div className="space-y-2">
            {funnelData.map((stage) => (
              <div key={stage.name} className="flex items-center gap-3">
                <div className="w-20 text-xs text-muted-foreground font-medium">
                  {stage.name}
                </div>
                <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(stage.value / funnelData[0].value) * 100}%`,
                      backgroundColor: stage.fill,
                    }}
                  />
                </div>
                <div className="w-8 text-xs font-bold text-foreground text-right">
                  {stage.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Conversion rate:{" "}
            <span className="font-semibold text-green-600">
              {Math.round((funnelData[4].value / funnelData[0].value) * 100)}%
            </span>{" "}
            sourced → placed
          </div>
        </motion.div>

        {/* Country Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <h2 className="font-semibold text-foreground mb-4">
            Candidates by Country
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={countryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {countryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: 11 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
