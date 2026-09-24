import request from 'supertest';
import { app } from '../src/app';
import { resetNotes } from '../src/services/notes.service';

beforeEach(() => {
  resetNotes();
});

async function createNote(title = 'First note', content = 'Hello') {
  return request(app).post('/api/notes').send({ title, content });
}

describe('Notes API', () => {
  it('starts with an empty list', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('creates a note', async () => {
    const res = await createNote('Buy milk', '2 litres');
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Buy milk', content: '2 litres' });
    expect(typeof res.body.id).toBe('string');
  });

  it('rejects a note with no title', async () => {
    const res = await request(app).post('/api/notes').send({ content: 'no title' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('title is required');
  });

  it('rejects malformed JSON', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Content-Type', 'application/json')
      .send('{ not json');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid JSON body' });
  });

  it('gets a note by id', async () => {
    const created = await createNote();
    const res = await request(app).get(`/api/notes/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  it('returns 404 for an unknown note', async () => {
    const res = await request(app).get('/api/notes/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Note not found' });
  });

  it('updates a note', async () => {
    const created = await createNote('Old title', 'Body');
    const res = await request(app)
      .patch(`/api/notes/${created.body.id}`)
      .send({ title: 'New title' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'New title', content: 'Body' });
  });

  it('rejects an empty update', async () => {
    const created = await createNote();
    const res = await request(app).patch(`/api/notes/${created.body.id}`).send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('at least one field');
  });

  it('deletes a note', async () => {
    const created = await createNote();
    const del = await request(app).delete(`/api/notes/${created.body.id}`);
    expect(del.status).toBe(204);

    const after = await request(app).get(`/api/notes/${created.body.id}`);
    expect(after.status).toBe(404);
  });
});
