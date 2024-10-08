﻿using Microsoft.AspNetCore.SignalR;
using genai.backend.api.Hub;

namespace genai.backend.api.Services
{
    public class ResponseStream
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ResponseStream(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task BeginStream(string id)
        {
            await _hubContext.Clients.Groups(id).SendAsync("BeginStream", string.Empty);
        }
        public async Task PartialResponse(string id, string response)
        {
            await _hubContext.Clients.Groups(id).SendAsync("StreamMessage", response);
        }
        public async Task EndStream(string id)
        {
            await _hubContext.Clients.Groups(id).SendAsync("EndStream", string.Empty);
        }
        public async Task Conversations(string id, string response)
        {
            await _hubContext.Clients.Groups(id).SendAsync("ChatTitles", response);
        }
        public async Task AvailableModels(string id, Array response)
        {
            await _hubContext.Clients.Groups(id).SendAsync("AvailableModels", response);
        }
        public async Task ClearConversations(string id)
        {
            await _hubContext.Clients.Groups(id).SendAsync("ClearChatTitles", string.Empty);
        }
    }
}
