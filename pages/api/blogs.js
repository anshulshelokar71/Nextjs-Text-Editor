import dbConnect from '../../lib/dbConnect';
import Blog from '../../models/Blog';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const blogs = await Blog.find({}); // Fetch all blogs
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        console.log('Received data:', req.body);
        // Validate input
        // if (!title || !content) {
        //     throw new Error("Title and content are required");
        //   }
        const blog = await Blog.create(req.body); // Create new blog
        res.status(201).json({ success: true, data: blog });
      } catch (error) {
        console.error("Error saving blog:", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
