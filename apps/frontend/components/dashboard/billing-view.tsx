"use client";

import React, { useEffect, useState } from "react";
import {
  CreditCard,
  FileText,
  Download,
  AlertTriangle,
  PieChart,
  Check,
  TrendingDown,
  DollarSign,
  Target,
  Lightbulb,
  Zap,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";

export default function BillingView() {
  const [summary, setSummary] = useState<any>(null);
  const [costAnalysis, setCostAnalysis] = useState<any>(null);
  const [costForecast, setCostForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "optimization" | "forecast"
  >("overview");
  useEffect(() => {
    const fetchBilling = async () => {
      try {
        setLoading(true);
        const [billingData, costData, forecastData] = await Promise.all([
          api.get("/billing", true), // Use cache
          api.get("/cost-estimation/analyze", true), // Get cost analysis
          api.get("/cost-estimation/forecast", true), // Get cost forecast
        ]);
        setSummary(billingData);
        setCostAnalysis(costData);
        setCostForecast(forecastData);
      } catch (error) {
        console.error("Failed to load billing data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  if (loading) return <div className="p-8">Loading billing data...</div>;
  if (!summary) return <div className="p-8">No billing data available</div>;

  const percentage = Math.min(
    100,
    (summary.currentSpend / summary.budget) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Billing & Cost Optimization
          </h2>
          <p className="text-muted-foreground">
            Monitor costs, optimize spending, and manage your budget.
          </p>
        </div>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" /> Billing Docs
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value: any) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Cost Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Current Period Consumption</CardTitle>
                <CardDescription>
                  Billing period:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">
                    ${summary.currentSpend?.toFixed(2) || "0.00"}
                  </span>
                  <span className="text-muted-foreground">
                    / ${summary.budget?.toFixed(2) || "0.00"} limit
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to budget alert</span>
                    <span className="font-medium text-orange-600">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2 w-full bg-muted rounded-full overflow-hidden"
                  />
                  <p className="text-xs text-muted-foreground pt-1">
                    You are projected to spend{" "}
                    <span className="font-medium text-foreground">
                      ${summary.projectedSpend?.toFixed(2) || "0.00"}
                    </span>{" "}
                    by end of month.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/40 rounded-lg border">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Current Spend
                    </div>
                    <div className="text-lg font-bold">
                      ${summary.currentSpend?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Projected
                    </div>
                    <div className="text-lg font-bold">
                      ${summary.projectedSpend?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Budget
                    </div>
                    <div className="text-lg font-bold">
                      ${summary.budget?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {summary.paymentMethods && summary.paymentMethods.length > 0 ? (
                  summary.paymentMethods.map((pm: any) => (
                    <div
                      key={pm.id}
                      className="flex items-center gap-4 p-3 border rounded-lg bg-card"
                    >
                      <div className="h-10 w-14 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold font-serif italic">
                        {pm.type.toUpperCase().substring(0, 4)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {pm.type} ending in {pm.last4}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires {pm.expiry}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        Default
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No payment methods
                  </p>
                )}
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" /> Add Method
                </Button>
              </CardContent>
              <CardFooter className="bg-muted/20 border-t p-4">
                <div className="flex gap-2 text-sm text-muted-foreground items-start">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <p className="text-xs">
                    Your next invoice will be processed on Nov 1st
                    automatically.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          {/* Cost Optimization Section */}
          {costAnalysis && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Cost Breakdown
                  </CardTitle>
                  <CardDescription>
                    Monthly costs by service type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(costAnalysis.costByService || {}).map(
                      ([service, cost]: [string, any]) => (
                        <div
                          key={service}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                service === "EC2"
                                  ? "bg-blue-500"
                                  : service === "RDS"
                                    ? "bg-green-500"
                                    : service === "S3"
                                      ? "bg-orange-500"
                                      : "bg-purple-500"
                              }`}
                            />
                            <span className="font-medium">{service}</span>
                          </div>
                          <span className="font-bold">${cost.toFixed(2)}</span>
                        </div>
                      )
                    )}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total Monthly</span>
                        <span>
                          ${costAnalysis.totalMonthlyCost?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Cost Optimization
                  </CardTitle>
                  <CardDescription>
                    Potential savings opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {costAnalysis.optimizations &&
                  costAnalysis.optimizations.length > 0 ? (
                    <div className="space-y-4">
                      {costAnalysis.optimizations
                        .slice(0, 3)
                        .map((opt: any) => (
                          <div
                            key={opt.resourceId}
                            className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-800 dark:text-green-200">
                                  Save ${opt.totalPotentialSavings.toFixed(2)}
                                  /month
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-200"
                              >
                                High Impact
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              {opt.recommendations
                                .slice(0, 2)
                                .map((rec: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="text-sm text-green-700 dark:text-green-300"
                                  >
                                    <div className="flex items-start gap-2">
                                      <Zap className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                      <span>{rec.description}</span>
                                    </div>
                                    <div className="ml-5 mt-1 text-xs opacity-75">
                                      Potential savings: $
                                      {rec.potentialSavings.toFixed(2)}/month
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            Total Potential Savings
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            $
                            {costAnalysis.optimizations
                              .reduce(
                                (sum: number, opt: any) =>
                                  sum + opt.totalPotentialSavings,
                                0
                              )
                              .toFixed(2)}
                            /month
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No optimization opportunities found</p>
                      <p className="text-sm">
                        Your resources are already well-optimized!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          {costAnalysis?.costTrend && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Cost Trend (Last 30 Days)
                </CardTitle>
                <CardDescription>
                  Daily spending pattern analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-1">
                  {costAnalysis.costTrend
                    .slice(-20)
                    .map((point: any, i: number) => {
                      const maxCost = Math.max(
                        ...costAnalysis.costTrend.map((p: any) => p.cost)
                      );
                      const height =
                        maxCost > 0 ? (point.cost / maxCost) * 100 : 0;
                      return (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
                            style={{ height: `${height}%`, minHeight: "4px" }}
                          />
                          <span className="text-xs text-muted-foreground transform -rotate-45 origin-top-left">
                            {new Date(point.date).getDate()}
                          </span>
                        </div>
                      );
                    })}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-4">
                  <span>20 days ago</span>
                  <span>Today</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          {/* Cost Forecasting */}
          {costForecast && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Cost Forecast
                  </CardTitle>
                  <CardDescription>
                    Projected spending for next month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${costForecast.forecast?.toFixed(2) || "0.00"}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Projected next month
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {costForecast.confidence
                          ? `${(costForecast.confidence * 100).toFixed(0)}%`
                          : "0%"}{" "}
                        confidence
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Month</span>
                        <span className="font-medium">
                          ${costForecast.currentMonth?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Projected Growth</span>
                        <span
                          className={`font-medium ${costForecast.forecast > costForecast.currentMonth ? "text-red-600" : "text-green-600"}`}
                        >
                          {costForecast.currentMonth > 0
                            ? (
                                ((costForecast.forecast -
                                  costForecast.currentMonth) /
                                  costForecast.currentMonth) *
                                100
                              ).toFixed(1)
                            : "0.0"}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Trend</span>
                        <Badge
                          variant={
                            costForecast.trend === "increasing"
                              ? "destructive"
                              : costForecast.trend === "decreasing"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {costForecast.trend || "stable"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forecast Breakdown</CardTitle>
                  <CardDescription>
                    Cost breakdown by service type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(costForecast.breakdown || {}).map(
                      ([service, cost]: [string, any]) => (
                        <div
                          key={service}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                service === "EC2"
                                  ? "bg-blue-500"
                                  : service === "RDS"
                                    ? "bg-green-500"
                                    : service === "S3"
                                      ? "bg-orange-500"
                                      : "bg-purple-500"
                              }`}
                            />
                            <span className="font-medium">{service}</span>
                          </div>
                          <span className="font-bold">${cost.toFixed(2)}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Anomalies Detection */}
          {costForecast?.anomalies && costForecast.anomalies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Cost Anomalies Detected
                </CardTitle>
                <CardDescription>
                  Unusual spending patterns that may require attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costForecast.anomalies.map((anomaly: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-950/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-orange-800 dark:text-orange-200">
                          {new Date(anomaly.date).toLocaleDateString()}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-orange-600 border-orange-200"
                        >
                          {(
                            ((anomaly.actual - anomaly.expected) /
                              anomaly.expected) *
                            100
                          ).toFixed(1)}
                          % deviation
                        </Badge>
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">
                        Actual: ${anomaly.actual.toFixed(2)} | Expected: $
                        {anomaly.expected.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.invoices && summary.invoices.length > 0 ? (
                summary.invoices.map((inv: any) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell>
                      {new Date(inv.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${inv.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`flex w-fit items-center gap-1 ${
                          inv.status === "Paid"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : inv.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        <Check className="h-3 w-3" /> {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
