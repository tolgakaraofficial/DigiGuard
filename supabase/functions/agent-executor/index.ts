import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.99.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseKey);

async function logTask(
  agentId: string,
  type: string,
  status: string,
  result?: any,
  error?: string
) {
  const { data, error: err } = await supabase
    .from("agent_tasks")
    .insert({
      agent_id: agentId,
      type,
      status,
      result,
      error,
    })
    .select()
    .maybeSingle();

  if (err) throw err;
  return data;
}

async function runMonitoringAgent() {
  try {
    const { data: stats } = await supabase
      .from("user_statistics")
      .select("*")
      .maybeSingle();

    const result = {
      timestamp: new Date().toISOString(),
      totalUsers: stats?.total_certified_users || 0,
      status: "operational",
    };

    await logTask("monitoring-agent", "monitoring", "completed", result);
    return result;
  } catch (error) {
    await logTask(
      "monitoring-agent",
      "monitoring",
      "failed",
      null,
      String(error)
    );
    throw error;
  }
}

async function runReportingAgent() {
  try {
    const { data: tasks } = await supabase
      .from("agent_tasks")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    const report = {
      generatedAt: new Date().toISOString(),
      totalTasks: tasks?.length || 0,
      completedTasks: tasks?.filter((t) => t.status === "completed").length || 0,
      failedTasks: tasks?.filter((t) => t.status === "failed").length || 0,
    };

    await logTask("reporting-agent", "reporting", "completed", report);
    return report;
  } catch (error) {
    await logTask(
      "reporting-agent",
      "reporting",
      "failed",
      null,
      String(error)
    );
    throw error;
  }
}

async function runAutomationAgent() {
  try {
    const result = {
      timestamp: new Date().toISOString(),
      tasksProcessed: 0,
      status: "operational",
    };

    await logTask("automation-agent", "automation", "completed", result);
    return result;
  } catch (error) {
    await logTask(
      "automation-agent",
      "automation",
      "failed",
      null,
      String(error)
    );
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const agentType = new URL(req.url).searchParams.get("agent") || "all";

    let results: any[] = [];

    if (agentType === "all" || agentType === "monitoring") {
      results.push(await runMonitoringAgent());
    }

    if (agentType === "all" || agentType === "reporting") {
      results.push(await runReportingAgent());
    }

    if (agentType === "all" || agentType === "automation") {
      results.push(await runAutomationAgent());
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Agents executed successfully",
        results,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
