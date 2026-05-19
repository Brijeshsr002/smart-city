import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { issueStatusUpdateSchema } from "@/lib/validation/schemas";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const parsed = issueStatusUpdateSchema.safeParse({
    issueId: id,
    status: body.status,
    notes: body.notes,
    imageUrl: body.imageUrl
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: oldIssue } = await supabase.from("issues").select("status").eq("id", id).single();

  const { error: updateError } = await supabase
    .from("issues")
    .update({
      status: parsed.data.status,
      updated_at: new Date().toISOString(),
      fixed_date: parsed.data.status === "resolved" ? new Date().toISOString() : null,
      proof_image_url: parsed.data.imageUrl ?? null
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const { error: updateLogError } = await supabase.from("issue_updates").insert({
    issue_id: id,
    old_status: oldIssue?.status ?? "new",
    new_status: parsed.data.status,
    notes: parsed.data.notes,
    image_url: parsed.data.imageUrl ?? null
  });

  if (updateLogError) {
    return NextResponse.json({ error: updateLogError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
