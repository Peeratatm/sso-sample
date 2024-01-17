export const dynamic = 'force-dynamic' 
export async function GET(request) {
    return Response.json({ message: "Hello World" })
}