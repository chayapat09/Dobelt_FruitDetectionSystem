# Belt Class that communicates with server via socket.io
# 1. Wait for event from server
# 2. Use Belt Move/stop commands
# 3. get Server last state on initialized / reconnection
# 4. and each detection event need to have eventId send with it in every req , res ?? if needed