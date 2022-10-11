import {NextRequest} from 'next/server';
import {createClient} from '@supabase/supabase-js';
const supabase = createClient(process.env.API_URL!, process.env.API_KEY!);

export default async function handler(req: NextRequest) {
  const slug = (await req.json()).slug;
  let {data: postData, error} = await supabase
    .from('post_data')
    .select('likes')
    .eq('slug', slug);
  if (!postData![0]) {
    await supabase.from('post_data').insert([{slug}]);
    return new Response('0');
  }
  return new Response(postData![0].likes);
}

export const config = {
  runtime: 'experimental-edge',
};
