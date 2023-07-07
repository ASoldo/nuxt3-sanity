export default defineEventHandler(async () => {
  const baseUrl = import.meta.env.BASE_URL;
  const query = '*[_type == "question"]';
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(`${baseUrl}?query=${encodedQuery}`);
  const data = await response.json();

  // (import.meta as any)
  const supabaseUrl = (import.meta as any).env.SUPABASE_QUERY_URL;
  const apiKey = import.meta.env.API_KEY;
  const bearerToken = import.meta.env.API_KEY;
  const supabaseHeaders = {
    apikey: apiKey,
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  const records = data.result.map((record: any) => ({
    provided_text: record.provided_text.current,
  }));

  for (const record of records) {
    const supabaseResponse = await fetch(supabaseUrl, {
      method: "POST",
      headers: supabaseHeaders,
      body: JSON.stringify(record),
    });

    if (!supabaseResponse.ok) {
      return { message: `Error: ${supabaseResponse.statusText}` };
    }
  }

  return { message: "Success: Data inserted into Supabase" };
});
