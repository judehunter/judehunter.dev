import {NextRequest} from 'next/server';
import {createClient} from '@supabase/supabase-js';
const supabase = createClient(process.env.API_URL!, process.env.API_KEY!);

export default async function handler(req: NextRequest) {
  const slug = (await req.json()).slug;
  const {data, error} = await supabase.rpc('increment_post_likes', {
    row_slug: slug,
  });
  return new Response();
}

export const config = {
  runtime: 'experimental-edge',
};
