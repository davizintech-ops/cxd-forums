const { createClient } = supabase;

const db = createClient(
    "https://xvnjpaydxexozwitcqau.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bmpwYXlkeGV4b3p3aXRjcWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5ODEwMzIsImV4cCI6MjA5OTU1NzAzMn0.N7wNE6kE29n32UclR1BRR-JE5pWtCpCwSPFj5XvxulQ"
);

window.db = db;

console.log("Supabase carregado", db);